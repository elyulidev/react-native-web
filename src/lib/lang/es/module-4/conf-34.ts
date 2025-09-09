import type { CurriculumTopic } from "../../../../types/types";

export const conference34: CurriculumTopic = {
	id: "conf-34",
	title: "Conf. 34: Imágenes y File System",
	content: [
		{ type: "heading", text: "Manejo de Imágenes y Sistema de Archivos Local" },
		{
			type: "paragraph",
			text: "Muchas aplicaciones necesitan que los usuarios suban imágenes, ya sea para un perfil, una publicación o un producto. En esta conferencia, aprenderemos a usar `expo-image-picker` para acceder a la cámara y la galería del dispositivo, y `expo-file-system` para gestionar estos archivos de forma persistente.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Instalación y Permisos" },
		{
			type: "paragraph",
			text: "Primero, necesitamos instalar la librería para seleccionar imágenes:",
		},
		{
			type: "code",
			language: "bash",
			code: `npx expo install expo-image-picker`,
		},
		{
			type: "paragraph",
			text: "Para acceder a la cámara o a la galería, la aplicación debe solicitar permiso al usuario. `expo-image-picker` nos proporciona funciones para gestionar esto. No es necesario añadir nada al `app.json` para la configuración básica en Expo Go, pero para builds de producción sí se requiere.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Captura de Imágenes desde la Galería" },
		{
			type: "paragraph",
			text: "Vamos a crear una función que solicite permiso para acceder a la galería y, si se concede, abra el selector de imágenes.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import React, { useState } from 'react';
import { Button, Image, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    // Solicitar permiso para acceder a la mediateca
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Lo sentimos, necesitamos permisos de la galería para que esto funcione.');
      return;
    }

    // Abrir el selector de imágenes
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Solo imágenes
      allowsEditing: true, // Permite al usuario editar la imagen
      aspect: [4, 3], // Relación de aspecto para el editor
      quality: 1, // Máxima calidad
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 items-center justify-center gap-5">
      <Button title="Seleccionar imagen de la galería" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} className="w-48 h-48 rounded-lg" />}
    </View>
  );
}
`,
		},
		{
			type: "list",
			items: [
				"**`requestMediaLibraryPermissionsAsync`**: Muestra el diálogo de permisos nativo.",
				"**`launchImageLibraryAsync`**: Abre la galería del dispositivo.",
				"**`result.canceled`**: Nos dice si el usuario cerró el selector sin elegir una imagen.",
				"**`result.assets[0].uri`**: Contiene la URI local del archivo de imagen seleccionado. **Importante:** Esta URI es temporal y podría ser borrada por el sistema operativo.",
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Almacenamiento Persistente con `expo-file-system`",
		},
		{
			type: "paragraph",
			text: "Como la URI de `expo-image-picker` es temporal, si queremos que la imagen persista entre sesiones, debemos copiarla a un directorio permanente de nuestra aplicación. Aquí es donde entra en juego `expo-file-system`.",
		},
		{ type: "paragraph", text: "Instalamos la librería:" },
		{
			type: "code",
			language: "bash",
			code: "npx expo install expo-file-system",
		},
		{
			type: "paragraph",
			text: "Luego, podemos crear una función para guardar la imagen:",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import * as FileSystem from 'expo-file-system';

const saveImagePermanently = async (temporaryUri: string): Promise<string | null> => {
  try {
    const fileName = temporaryUri.split('/').pop();
    if (!fileName) throw new Error('No se pudo obtener el nombre del archivo');

    const permanentDirectory = FileSystem.documentDirectory + 'images/';

    // Asegurarse de que el directorio de imágenes exista
    await FileSystem.makeDirectoryAsync(permanentDirectory, { intermediates: true });

    const permanentUri = permanentDirectory + fileName;

    // Copiar el archivo desde la ubicación temporal a la permanente
    await FileSystem.copyAsync({
      from: temporaryUri,
      to: permanentUri,
    });

    return permanentUri;
  } catch (error) {
    console.error("Error al guardar la imagen:", error);
    return null;
  }
};

// ...en tu componente, después de obtener la imagen:
// if (!result.canceled) {
//   const permanentUri = await saveImagePermanently(result.assets[0].uri);
//   if (permanentUri) {
//     setImageUri(permanentUri);
//     // Ahora puedes guardar esta 'permanentUri' en tu base de datos SQLite.
//   }
// }
`,
		},
		{
			type: "list",
			items: [
				"**`FileSystem.documentDirectory`**: Es una constante que apunta a un directorio privado de tu aplicación donde puedes almacenar archivos que el usuario no debe manipular directamente.",
				"**`FileSystem.copyAsync`**: Copia el archivo de la URI temporal a nuestra ubicación permanente.",
				"La `permanentUri` devuelta es la que deberías guardar en tu base de datos SQLite para poder cargar la imagen más tarde.",
			],
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Qué función de `expo-image-picker` se utiliza para abrir la galería de fotos del dispositivo?",
					options: [
						"`launchCameraAsync`",
						"`getMediaLibraryPermissionsAsync`",
						"`launchImageLibraryAsync`",
						"`getAlbumAsync`",
					],
					correctAnswer: 2,
				},
				{
					question:
						"La URI de una imagen devuelta por `expo-image-picker` es...",
					options: [
						"Permanente y segura para almacenar en una base de datos.",
						"Una URL pública accesible desde cualquier lugar.",
						"Temporal y podría ser eliminada por el sistema operativo.",
						"Una cadena en base64.",
					],
					correctAnswer: 2,
				},
				{
					question:
						"¿Para qué se utiliza `expo-file-system` en el contexto de la selección de imágenes?",
					options: [
						"Para comprimir la imagen seleccionada.",
						"Para aplicar filtros a la imagen.",
						"Para copiar la imagen desde su ubicación temporal a un directorio permanente de la aplicación.",
						"Para subir la imagen a un servidor en la nube.",
					],
					correctAnswer: 2,
				},
				{
					question: "`FileSystem.documentDirectory` apunta a...",
					options: [
						"La carpeta de descargas del dispositivo.",
						"Un directorio público en la tarjeta SD.",
						"Un directorio privado y persistente dentro del espacio de tu aplicación.",
						"La caché de la aplicación, que se borra regularmente.",
					],
					correctAnswer: 2,
				},
			],
		},
	],
};
