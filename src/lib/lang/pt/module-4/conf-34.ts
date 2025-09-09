import type { CurriculumTopic } from "../../../../types/types";

export const conference34: CurriculumTopic = {
	id: "conf-34",
	title: "Conf. 34: Imagens e Sistema de Arquivos",
	content: [
		{
			type: "heading",
			text: "Manuseio de Imagens e Sistema de Ficheiros Local",
		},
		{
			type: "paragraph",
			text: "Muitas aplicações precisam que os utilizadores carreguem imagens, seja para um perfil, uma publicação ou um produto. Nesta conferência, aprenderemos a usar o `expo-image-picker` para aceder à câmara e à galeria do dispositivo, e o `expo-file-system` para gerir estes ficheiros de forma persistente.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Instalação e Permissões" },
		{
			type: "paragraph",
			text: "Primeiro, precisamos de instalar a biblioteca para selecionar imagens:",
		},
		{
			type: "code",
			language: "bash",
			code: `npx expo install expo-image-picker`,
		},
		{
			type: "paragraph",
			text: "Para aceder à câmara ou à galeria, a aplicação deve solicitar permissão ao utilizador. O `expo-image-picker` fornece-nos funções para gerir isto. Não é necessário adicionar nada ao `app.json` para a configuração básica no Expo Go, mas para builds de produção é necessário.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Captura de Imagens da Galeria" },
		{
			type: "paragraph",
			text: "Vamos criar uma função que solicite permissão para aceder à galeria e, se concedida, abra o seletor de imagens.",
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
    // Solicitar permissão para aceder à biblioteca de média
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos das permissões da galeria para que isto funcione.');
      return;
    }

    // Abrir o seletor de imagens
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Apenas imagens
      allowsEditing: true, // Permite ao utilizador editar a imagem
      aspect: [4, 3], // Relação de aspeto para o editor
      quality: 1, // Qualidade máxima
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 items-center justify-center gap-5">
      <Button title="Selecionar imagem da galeria" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} className="w-48 h-48 rounded-lg" />}
    </View>
  );
}
`,
		},
		{
			type: "list",
			items: [
				"**`requestMediaLibraryPermissionsAsync`**: Mostra o diálogo de permissões nativo.",
				"**`launchImageLibraryAsync`**: Abre a galeria do dispositivo.",
				"**`result.canceled`**: Diz-nos se o utilizador fechou o seletor sem escolher uma imagem.",
				"**`result.assets[0].uri`**: Contém o URI local do ficheiro de imagem selecionado. **Importante:** Este URI é temporário e pode ser apagado pelo sistema operativo.",
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Armazenamento Persistente com `expo-file-system`",
		},
		{
			type: "paragraph",
			text: "Como o URI do `expo-image-picker` é temporário, se quisermos que a imagem persista entre sessões, devemos copiá-la para um diretório permanente da nossa aplicação. É aqui que entra o `expo-file-system`.",
		},
		{ type: "paragraph", text: "Instalamos a biblioteca:" },
		{
			type: "code",
			language: "bash",
			code: "npx expo install expo-file-system",
		},
		{
			type: "paragraph",
			text: "Depois, podemos criar uma função para guardar a imagem:",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import * as FileSystem from 'expo-file-system';

const saveImagePermanently = async (temporaryUri: string): Promise<string | null> => {
  try {
    const fileName = temporaryUri.split('/').pop();
    if (!fileName) throw new Error('Não foi possível obter o nome do ficheiro');

    const permanentDirectory = FileSystem.documentDirectory + 'images/';

    // Garantir que o diretório de imagens existe
    await FileSystem.makeDirectoryAsync(permanentDirectory, { intermediates: true });

    const permanentUri = permanentDirectory + fileName;

    // Copiar o ficheiro da localização temporária para a permanente
    await FileSystem.copyAsync({
      from: temporaryUri,
      to: permanentUri,
    });

    return permanentUri;
  } catch (error) {
    console.error("Erro ao guardar a imagem:", error);
    return null;
  }
};

// ...no seu componente, depois de obter a imagem:
// if (!result.canceled) {
//   const permanentUri = await saveImagePermanently(result.assets[0].uri);
//   if (permanentUri) {
//     setImageUri(permanentUri);
//     // Agora pode guardar este 'permanentUri' na sua base de dados SQLite.
//   }
// }
`,
		},
		{
			type: "list",
			items: [
				"**`FileSystem.documentDirectory`**: É uma constante que aponta para um diretório privado da sua aplicação onde pode armazenar ficheiros que o utilizador não deve manipular diretamente.",
				"**`FileSystem.copyAsync`**: Copia o ficheiro do URI temporário para a nossa localização permanente.",
				"O `permanentUri` devolvido é o que deve guardar na sua base de dados SQLite para poder carregar a imagem mais tarde.",
			],
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Que função do `expo-image-picker` é utilizada para abrir a galeria de fotos do dispositivo?",
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
						"O URI de uma imagem devolvido pelo `expo-image-picker` é...",
					options: [
						"Permanente e seguro para armazenar numa base de dados.",
						"Um URL público acessível de qualquer lugar.",
						"Temporário e pode ser eliminado pelo sistema operativo.",
						"Uma string em base64.",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Para que é utilizado o `expo-file-system` no contexto da seleção de imagens?",
					options: [
						"Para comprimir a imagem selecionada.",
						"Para aplicar filtros à imagem.",
						"Para copiar a imagem da sua localização temporária para um diretório permanente da aplicação.",
						"Para carregar a imagem para um servidor na nuvem.",
					],
					correctAnswer: 2,
				},
				{
					question: "`FileSystem.documentDirectory` aponta para...",
					options: [
						"A pasta de transferências do dispositivo.",
						"Um diretório público no cartão SD.",
						"Um diretório privado e persistente dentro do espaço da sua aplicação.",
						"A cache da aplicação, que é limpa regularmente.",
					],
					correctAnswer: 2,
				},
			],
		},
	],
};
