# Guía de Configuración de Supabase para Producción

Para que la aplicación funcione completamente con su nuevo sistema de roles (autenticación, guardado de resultados, panel de administración), es crucial que configures correctamente tu proyecto en Supabase.

A continuación se detallan los pasos que **tú debes realizar** en tu panel de Supabase.

---

### Paso 1: Obtén tus Credenciales de API

Primero, necesitas conectar la aplicación a tu proyecto de Supabase.

1.  Ve a tu proyecto en [supabase.com](https://supabase.com).
2.  En el menú lateral, haz clic en el ícono de **Configuración del Proyecto** (rueda dentada).
3.  Selecciona la pestaña **API**.
4.  En esta sección, encontrarás dos valores clave:
    - **Project URL**
    - **Project API Keys** -> `anon` `public`
5.  Copia estos dos valores y pégalos en el archivo `constants.ts` de tu proyecto, reemplazando los valores de ejemplo:

    ```typescript
    // constants.ts

    // REEMPLAZA ESTO CON TUS CREDENCIALES
    export const SUPABASE_URL = "https://<tu-id-de-proyecto>.supabase.co";
    export const SUPABASE_ANON_KEY = "<tu-clave-anon-public>";
    export const SUPABASE_ID = "<tu-id-de-proyecto>";
    ```

---

### Paso 2: Crea las Tablas y Roles en la Base de Datos

La aplicación necesita un conjunto de tablas para gestionar usuarios, roles, cursos y actividades.

1.  En tu panel de Supabase, ve al **Editor de SQL** (ícono de una base de datos con "SQL").
2.  Haz clic en **"New query"**.
3.  Copia y pega el siguiente código SQL completo en el editor y haz clic en **"RUN"**. Este script creará todas las tablas, roles e insertará los datos iniciales necesarios.

```sql
-- 1. Tabla para los Roles
-- Almacena los roles que un usuario puede tener en el sistema.
CREATE TABLE public.roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL CHECK (name IN ('admin', 'instructor', 'student')),
  description text,
  created_at timestamptz DEFAULT now()
);

-- Insertar los roles básicos con UUIDs fijos para facilitar la asignación
INSERT INTO public.roles (id, name, description) VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'admin', 'Acceso completo al sistema'),
('b2c3d4e5-f6a7-8901-2345-67890abcdef1', 'instructor', 'Puede gestionar contenido del curso'),
('c3d4e5f6-a7b8-9012-3456-7890abcdef2', 'student', 'Puede acceder a contenidos del curso');


-- 2. Tabla para los Cursos
-- Almacena los diferentes cursos o cohortes.
CREATE TABLE public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Insertar el curso de demostración
INSERT INTO public.courses (id, name)
VALUES ('e9e0755e-013d-4c3e-a83d-8a6526a0c444', 'Bootcamp 2025-2026');


-- 3. Tabla para Perfiles de Usuario
-- Se sincroniza con la tabla de autenticación de Supabase (auth.users).
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  role_id uuid REFERENCES public.roles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);


-- 4. Tabla de asignación de cursos a usuarios
CREATE TABLE public.user_course (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);


-- 5. Tabla para los Intentos de Quiz
CREATE TABLE public.quiz_attempts (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  quiz_id text NOT NULL,
  score integer NOT NULL,
  answers jsonb,
  created_at timestamptz DEFAULT now()
);


-- 6. Tabla para Entregas de Tareas Prácticas
CREATE TABLE public.assignment_submissions (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  assignment_id text NOT NULL,
  content text,
  created_at timestamptz DEFAULT now()
);


-- 7. FUNCIÓN Y TRIGGER: Sincronización automática de perfiles
-- Esta función crea una entrada en `public.profiles` con el rol de 'student' por defecto
-- cada vez que un nuevo usuario se registra en el sistema.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  student_role_id uuid;
BEGIN
  -- Encuentra el UUID para el rol 'student'
  SELECT id INTO student_role_id FROM public.roles WHERE name = 'student' LIMIT 1;

  -- Inserta en public.profiles con el rol por defecto
  INSERT INTO public.profiles (id, email, role_id)
  VALUES (new.id, new.email, student_role_id);

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- El trigger ejecuta la función anterior después de cada nuevo registro en `auth.users`.
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

```

---

### Paso 3: Habilita la Seguridad (Row Level Security - RLS) y Crea Políticas

1.  En tu panel de Supabase, ve a **Authentication** (ícono de llave) -> **Policies**.
2.  Busca tus nuevas tablas y haz clic en **"Enable RLS"** para cada una de ellas: `roles`, `courses`, `profiles`, `user_course`, `quiz_attempts` y `assignment_submissions`.
3.  Ahora, vuelve al **Editor de SQL** y ejecuta las siguientes consultas para crear las políticas de acceso y las funciones de ayuda necesarias.

```sql
-- FUNCIÓN DE AYUDA para verificar si un usuario es admin
create or replace function is_admin(user_id uuid)
returns boolean
language plpgsql
security definer
as $$
declare
    user_role text;
begin
    select r.name into user_role
    from public.roles r
    join public.profiles p on p.role_id = r.id
    where p.id = user_id;

    return user_role = 'admin';
end;
$$;


-- FUNCIÓN SEGURA para eliminar usuarios (solo para admins)
CREATE OR REPLACE FUNCTION public.delete_user_by_id(user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER -- ¡IMPORTANTE! Se ejecuta con privilegios de superusuario.
SET search_path = public
AS $$
BEGIN
  -- Primero, verifica si el usuario que llama a la función es un administrador
  IF NOT is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'No tienes permiso para eliminar usuarios.';
  END IF;

  -- Elimina al usuario de la tabla de autenticación.
  -- Esto activará la eliminación en cascada en la tabla `profiles`.
  DELETE FROM auth.users WHERE id = user_id;
END;
$$;

-- Otorga permiso de ejecución de la función a los usuarios autenticados.
-- La lógica de seguridad está *dentro* de la propia función.
GRANT EXECUTE ON FUNCTION public.delete_user_by_id(uuid) TO authenticated;


-- =============================
-- POLÍTICAS DE ACCESO (RLS)
-- =============================

-- Tabla 'roles'
CREATE POLICY "Allow authenticated users to read roles"
ON public.roles FOR SELECT
TO authenticated USING (true);

-- Tabla 'courses'
CREATE POLICY "Allow authenticated read access to courses"
ON public.courses FOR SELECT
TO authenticated USING (true);

CREATE POLICY "Allow admin full access to courses"
ON public.courses FOR ALL
TO authenticated USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- Tabla 'profiles'
CREATE POLICY "Allow individual user to read their own profile"
ON public.profiles FOR SELECT
TO authenticated USING (auth.uid() = id);

CREATE POLICY "Allow admin users to read all profiles"
ON public.profiles FOR SELECT
TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Allow admin users to update profiles"
ON public.profiles FOR UPDATE
TO authenticated USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- Tabla 'quiz_attempts'
CREATE POLICY "Allow user to create their own quiz attempts"
ON public.quiz_attempts FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow user to read their own attempts"
ON public.quiz_attempts FOR SELECT
TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Allow admin users to read all attempts"
ON public.quiz_attempts FOR SELECT
TO authenticated USING (is_admin(auth.uid()));

-- Tabla 'assignment_submissions'
CREATE POLICY "Allow user to create their own submission"
ON public.assignment_submissions FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow user to read their own submission"
ON public.assignment_submissions FOR SELECT
TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Allow admin users to read all submissions"
ON public.assignment_submissions FOR SELECT
TO authenticated USING (is_admin(auth.uid()));
```

---

### Paso 4: Asignar el Rol de Administrador (Para Desarrollo)

Para poder acceder al Panel de Administración, tu usuario necesita tener el rol de 'admin'. Sigue estos pasos para asignarte este rol a ti mismo:

1.  **Regístrate en la Aplicación:**

    - Abre la aplicación en tu navegador o dispositivo.
    - Haz clic en "Iniciar Sesión" y regístrate con tu correo electrónico y una contraseña. Esto creará tu usuario en Supabase y le asignará el rol de 'student' por defecto.

2.  **Ve al Editor de Tablas de Supabase:**

    - En tu panel de Supabase, ve al **Editor de Tablas** (ícono de tabla).

3.  **Encuentra tu Perfil:**

    - En el panel izquierdo, selecciona la tabla `profiles`.
    - Busca la fila que corresponde a tu correo electrónico.

4.  **Cambia tu Rol a Administrador:**

    - Haz doble clic en la celda de la columna `role_id` para tu usuario.
    - Pega el siguiente ID, que corresponde al rol de 'admin' que insertamos en el Paso 2:
      ```
      a1b2c3d4-e5f6-7890-1234-567890abcdef
      ```
    - Haz clic en **"Save"**.

5.  **Vuelve a Cargar la Aplicación:**
    - Refresca la aplicación. Si ya habías iniciado sesión, es posible que necesites cerrar sesión y volver a iniciarla.
    - Ahora deberías ver el enlace al "Panel de Administración" en el menú de usuario.

---

¡Listo! Con estos pasos, tu backend en Supabase está completamente configurado para soportar el nuevo sistema de roles, permitiendo que la aplicación funcione como se espera.
