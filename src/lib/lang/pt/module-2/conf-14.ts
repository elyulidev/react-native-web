import type { CurriculumTopic } from "../../../../types/types";

export const conference14: CurriculumTopic = {
	id: "conf-14",
	title: "Conf. 14: Armazenamento Local",
	content: [
		{ type: "heading", text: "Armazenamento Local: Dados que Sobrevivem ao Fechamento do App" },
		{
			type: "paragraph",
			text: "Até aqui você guardou estado em memória com `useState` e o compartilhou entre telas com Context. Mas tudo isso tem a mesma vida do processo: você fecha o app e desaparece. O armazenamento local é a camada que grava no disco do dispositivo para que os dados continuem ali na próxima inicialização.",
		},
		{
			type: "paragraph",
			text: "Esta conferência não é sobre uma biblioteca: é sobre **escolher** a biblioteca certa. Primeiro o mapa das opções que existem, depois a que convém por padrão, e no final você a implementa em um hook real.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. O que é (e o que não é) o armazenamento local" },
		{
			type: "list",
			items: [
				"**Vive no dispositivo:** cada app roda no seu próprio sandbox. Outro app não pode ler seus dados, e você não pode ler os dele.",
				"**Persiste:** sobrevive a fechar o app, a reiniciar o celular e, em geral, às atualizações.",
				"**Não sincroniza sozinho:** se o usuário troca de celular ou reinstala, na maioria dos casos esses dados se perdem. O que você não pode perder vai para o backend.",
				"**É rápido e funciona offline:** por isso é o lugar natural para preferências, cache de respostas e rascunhos.",
			],
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Regra mental: o armazenamento local é um cache e um lugar para preferências. A fonte da verdade dos dados do usuário vive no seu servidor. Se o app não consegue reconstruir seu estado depois de uma reinstalação, o problema não é a biblioteca de storage: falta backend.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. O mapa: quais bibliotecas existem" },
		{
			type: "paragraph",
			text: "No React Native não existe o `localStorage` do navegador. Existem várias bibliotecas e cada uma resolve um problema diferente. Estas são as que você vai encontrar em projetos reais:",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "RectangleStackIcon",
					title: "AsyncStorage",
					text: "Chave-valor assíncrono e sem criptografia. A opção padrão para preferências. Funciona no Expo Go.",
				},
				{
					icon: "DocumentTextIcon",
					title: "expo-sqlite / kv-store",
					text: "A mesma API do AsyncStorage, mas gravando sobre SQLite. Sem dependência extra e com variante síncrona.",
				},
				{
					icon: "KeyIcon",
					title: "expo-secure-store",
					text: "Chave-valor criptografado no Keychain (iOS) e no Keystore (Android). Só para segredos: tokens e credenciais.",
				},
				{
					icon: "BoltIcon",
					title: "react-native-mmkv",
					text: "O mais rápido: síncrono e da ordem de 30 vezes mais veloz que o AsyncStorage. Exige development build.",
				},
			],
		},
		{
			type: "paragraph",
			text: "E quando o dado não é simplesmente uma chave com um valor:",
		},
		{
			type: "list",
			items: [
				"**expo-sqlite:** um banco SQLite completo no dispositivo. Você o escolhe quando precisa consultar, filtrar, ordenar ou relacionar tabelas. É a base do módulo 3 com Drizzle.",
				"**expo-file-system:** arquivos no disco: imagens baixadas, PDFs, JSON grandes. A API atual trabalha com `File`, `Directory` e `Paths`; a API antiga de `documentDirectory` e `copyAsync` está depreciada.",
				"**Camadas sobre SQLite (Drizzle, Knex):** quando você quer escrever consultas em TypeScript em vez de SQL na mão, ou lidar com migrações ordenadas.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Como escolher em trinta segundos" },
		{
			type: "list",
			items: [
				"É um segredo (token de sessão, senha, chave de API)? → `expo-secure-store`.",
				"É uma preferência ou um dado pequeno que você nunca consulta com filtros (tema, idioma, onboarding visto)? → `AsyncStorage`.",
				"Você precisa consultar, filtrar ou relacionar registros? → `expo-sqlite` (+ Drizzle).",
				"É um arquivo (imagem, PDF, vídeo)? → `expo-file-system`.",
				"Você precisa escrever muito e rápido a partir da thread de JavaScript? → `react-native-mmkv`.",
			],
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Escolher mal nem sempre quebra o app na hora. Escolher AsyncStorage para um token sim quebra a segurança, e vamos ver isso na seção 5.",
		},
		{ type: "divider" },

		{ type: "subtitle", id: "async-storage", text: "4. AsyncStorage: a opção padrão" },
		{
			type: "paragraph",
			text: "De todas as opções, o **AsyncStorage** é o mais popular e o mais fácil de começar: instala em um comando, funciona no Expo Go sem configuração nativa e sua API é tão padrão que as outras bibliotecas a imitam. Se o seu dado é pequeno e não é um segredo, comece por aqui.",
		},
		{
			type: "code",
			language: "bash",
			code: `bun expo install @react-native-async-storage/async-storage`,
		},
		{
			type: "list",
			items: [
				"**Assíncrono:** `setItem` e `getItem` devolvem Promises, então são usados com `async/await`.",
				"**Chave-valor:** você guarda um valor associado a uma chave única. Não existem tabelas nem consultas.",
				"**Apenas strings:** é a restrição que mais surpreende. Para guardar objetos ou arrays, serialize com `JSON.stringify()` e reconstrua com `JSON.parse()`.",
				"**removeItem não falha:** se a chave não existe, ele não faz nada. `getItem` devolve `null` quando não há valor.",
			],
		},
		{
			type: "code",
			language: "typescript",
			code: `
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'app:theme';

// --- Gravar uma string ---
await AsyncStorage.setItem(THEME_KEY, 'dark');

// --- Ler: devolve null se a chave não existe ---
const theme = await AsyncStorage.getItem(THEME_KEY);
console.log(theme); // 'dark'

// --- Remover ---
await AsyncStorage.removeItem(THEME_KEY);
`,
		},
		{
			type: "paragraph",
			text: "Para dados que não são strings, você serializa na fronteira e desserializa na leitura. Um objeto de perfil fica assim:",
		},
		{
			type: "code",
			language: "typescript",
			code: `
const PROFILE_KEY = 'app:profile';

async function saveProfile(profile) {
  // O AsyncStorage só grava strings: o objeto viaja como JSON
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

async function loadProfile() {
  const raw = await AsyncStorage.getItem(PROFILE_KEY);
  // null quando nada foi gravado ainda
  return raw ? JSON.parse(raw) : null;
}
`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Nomeie as chaves com um prefixo (app:theme, app:profile). A função getAllKeys() devolve todas as chaves do dispositivo, incluindo as de bibliotecas de terceiros, e o prefixo é o que permite distinguir as suas e limpá-las sem tocar nas alheias.",
		},
		{
			type: "paragraph",
			text: "Gravar pode falhar (disco cheio, permissões, dados corrompidos de uma versão anterior). O `AsyncStorage` não é um lugar para deixar uma exceção escapar sem tratamento:",
		},
		{
			type: "code",
			language: "typescript",
			code: `
async function saveTheme(theme) {
  try {
    await AsyncStorage.setItem('app:theme', theme);
  } catch (error) {
    // O app continua funcionando: o tema simplesmente não será lembrado
    console.warn('Não foi possível salvar o tema', error);
  }
}
`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "No Android, o backend do AsyncStorage é SQLite com um tamanho máximo de 6 MB por padrão. Se precisar de mais, amplia-se com a propriedade AsyncStorage_db_size_in_MB em android/gradle.properties, o que exige um development build. É mais um sinal de que dados grandes não pertencem aqui.",
		},
		{
			type: "callout",
			alertType: "info",
			text: "Com expo install no SDK 57 e no SDK 58 você recebe a v2.2.0, que é a usada no curso. A v3 (publicada em 2026) introduziu scoped storages com createAsyncStorage('user'); o import padrão continua funcionando igual. Se você instalar com npm install, vai receber a v3, e essa é a diferença que você vai notar.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "5. O limite que importa: os segredos" },
		{
			type: "paragraph",
			text: "O AsyncStorage **não criptografa nada**. Em um dispositivo com root ou em um backup mal protegido, um token gravado ali é lido como texto puro. Segredos vão para o `expo-secure-store`, que os criptografa usando o Keychain do iOS e o Keystore do Android.",
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Nunca guarde no AsyncStorage um token de sessão, uma senha ou uma chave de API. E também não use o SecureStore para tudo: ele é pensado para valores pequenos, não para caches de listas.",
		},
		{
			type: "code",
			language: "bash",
			code: `bun expo install expo-secure-store`,
		},
		{
			type: "code",
			language: "typescript",
			code: `
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'session:token';

// Mesma forma de chave-valor, mas criptografada pelo sistema operacional
await SecureStore.setItemAsync(TOKEN_KEY, token);

const token = await SecureStore.getItemAsync(TOKEN_KEY);

await SecureStore.deleteItemAsync(TOKEN_KEY);
`,
		},
		{
			type: "list",
			items: [
				"**Payloads pequenos:** a documentação do Expo avisa que o iOS historicamente rejeitava valores acima de uns 2048 bytes. Não é lugar para JSON grandes.",
				"**Persistência diferente por plataforma:** no iOS os dados sobrevivem à desinstalação com o mesmo bundle ID (comportamento do Keychain); no Android são apagados ao desinstalar.",
				"**Biometria:** com `requireAuthentication: true` o valor só é liberado depois do Face ID ou da digital. Se o usuário mudar as biometrias, o valor é invalidado e deixa de poder ser lido.",
				"**Não disponível na web:** o `expo-secure-store` suporta Android, iOS e tvOS. Se o seu app também roda no navegador, você precisa de outro caminho para essa plataforma.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "6. O atalho moderno: expo-sqlite/kv-store" },
		{
			type: "paragraph",
			text: "Se no seu projeto você já usa `expo-sqlite` (por exemplo, porque o módulo 3 traz Drizzle), o Expo oferece um armazenamento chave-valor **compatível com a API do AsyncStorage** e sem dependência extra. A migração é literalmente trocar o import:",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// Antes
import AsyncStorage from '@react-native-async-storage/async-storage';

// Depois: mesma API, backend SQLite, nenhuma dependência nova
import Storage from 'expo-sqlite/kv-store';

await Storage.setItem('app:theme', 'dark');
const theme = await Storage.getItem('app:theme');
`,
		},
		{
			type: "list",
			items: [
				"**Sem instalar nada:** o `expo-sqlite` faz parte do SDK, então o armazenamento vem incluído.",
				"**Síncrono e assíncrono:** além das versões com `await`, expõe `getItemSync` e `setItemSync` para leituras imediatas.",
				"**Mesmos métodos:** `getItem`, `setItem`, `removeItem`, `getAllKeys` e `clear` funcionam igual ao AsyncStorage.",
			],
		},
		{
			type: "callout",
			alertType: "tip",
			text: "No curso seguimos com o AsyncStorage porque é o que você vai encontrar na maioria dos projetos e tutoriais, e porque sua API é o denominador comum. Sabendo uma, a outra é uma troca de import.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "7. Tarefa Prática: um hook usePersistentState" },
		{
			type: "paragraph",
			text: "Vamos envolver o `useState` com o AsyncStorage para obter um estado que sobrevive ao fechamento do app. É o padrão que os apps reais usam para lembrar preferências, e ele obriga você a lidar com a parte mais delicada do armazenamento assíncrono: a carga inicial.",
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Atenção ao bug clássico: se você gravar em um useEffect que roda antes de a leitura terminar, a primeira escrita sobrescreve o valor gravado com o initialValue. Solução: um flag de hidratação que bloqueia as escritas até a carga terminar.",
		},
		{
			type: "assignment",
			assignmentId: "conf-14-persistent-state-hook",
			description: [
				"Requisitos:",
				"1. Seu hook deve se chamar usePersistentState e ficar em hooks/usePersistentState.ts.",
				"2. Deve receber uma chave (key) e um valor inicial (initialValue), e ser genérico: usePersistentState<T>(key: string, initialValue: T).",
				"3. Deve devolver a mesma tupla do useState: [value, setValue].",
				"4. Ao montar, deve ler o valor gravado com AsyncStorage.getItem e fazer o parse com JSON.parse. Se não houver nada, usa o initialValue.",
				"5. Deve gravar automaticamente cada mudança com AsyncStorage.setItem e JSON.stringify, mas só depois da carga inicial.",
				"6. Se a leitura ou a gravação falharem, o app não pode quebrar: capture o erro, registre no log e siga com o valor atual.",
			],
			code: `
// hooks/usePersistentState.ts (Sua solução aqui)
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Requisitos:
// 1. Receba uma key e um initialValue.
// 2. Devolva a tupla [value, setValue].
// 3. Carregue o valor gravado uma única vez ao montar.
// 4. Grave cada mudança, mas não antes de terminar a carga.
// 5. Se algo falhar, não quebre o app: registre no log e siga.

// --- Como usar (para testar seu hook) ---
import { View, Text, Pressable } from 'react-native';
import { usePersistentState } from '../hooks/usePersistentState';

export default function CounterScreen() {
  // O contador sobrevive a fechar e reabrir o app
  const [count, setCount] = usePersistentState<number>('counter', 0);

  return (
    <View className="items-center gap-4 p-6">
      <Text className="text-2xl">Contador: {count}</Text>
      <Pressable
        className="rounded-xl bg-primary-600 px-4 py-2"
        onPress={() => setCount(count + 1)}
      >
        <Text className="text-white">Incrementar</Text>
      </Pressable>
    </View>
  );
}
`,
		},
		{
			type: "paragraph",
			text: "Teste o resultado na mão: incremente o contador, feche o app por completo e abra de novo. Depois troque o `initialValue` e confirme que o contador **não** reinicia, porque o valor gravado tem prioridade.",
		},
	],
};
