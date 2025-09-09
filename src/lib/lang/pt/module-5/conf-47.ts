import type { CurriculumTopic } from "../../../../types/types";

export const conference47: CurriculumTopic = {
	id: "conf-47",
	title: "Conf. 47: Preparação para Publicação Local",
	content: [
		{ type: "heading", text: "Preparação para a Publicação Local" },
		{
			type: "paragraph",
			text: 'Até agora, executámos a nossa aplicação no Expo Go. Embora seja fantástico para o desenvolvimento rápido, tem limitações, especialmente quando se usam bibliotecas com código nativo que não estão incluídas no Expo Go. Para testar a sua aplicação num ambiente mais próximo da produção, precisa de criar um "build de desenvolvimento" (development build).',
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. O que é um Development Build?" },
		{
			type: "paragraph",
			text: "Um build de desenvolvimento é uma versão independente da sua aplicação (um ficheiro `.apk` para Android ou `.ipa` para iOS) que inclui as suas bibliotecas nativas personalizadas. Ao contrário do Expo Go, é feito à medida para o seu projeto, mas, ao contrário de um build de produção, ainda inclui as ferramentas de desenvolvimento do Expo, como o menu de desenvolvimento e a recarga rápida.",
		},
		{
			type: "callout",
			alertType: "info",
			text: "É a ponte perfeita: tem a fidelidade de um build de produção com a conveniência do desenvolvimento rápido.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Usando EAS (Expo Application Services)" },
		{
			type: "paragraph",
			text: "O EAS é o serviço na nuvem da Expo para construir e implementar aplicações. Embora possa fazer builds na nuvem (o que é útil para iOS se não tiver um Mac), também pode fazer builds **localmente** na sua própria máquina, o que é rápido e gratuito.",
		},

		{ type: "paragraph", text: "**Passo 1: Instalar a EAS CLI**" },
		{
			type: "paragraph",
			text: "Instale a interface de linha de comandos da EAS globalmente no seu sistema.",
		},
		{ type: "code", language: "bash", code: "npm install -g eas-cli" },

		{ type: "paragraph", text: "**Passo 2: Iniciar Sessão**" },
		{ type: "paragraph", text: "Ligue a CLI à sua conta Expo." },
		{ type: "code", language: "bash", code: "eas login" },

		{ type: "paragraph", text: "**Passo 3: Configurar o Projeto**" },
		{
			type: "paragraph",
			text: 'Este comando criará um ficheiro `eas.json` no seu projeto, que define diferentes "perfis" de build.',
		},
		{ type: "code", language: "bash", code: "eas build:configure" },
		{
			type: "paragraph",
			text: "O seu `eas.json` ficará algo assim. Focar-nos-emos no perfil `development`:",
		},
		{
			type: "code",
			language: "json",
			code: `
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
`,
		},
		{
			type: "list",
			items: [
				"**`developmentClient: true`**: Isto diz ao EAS para incluir as ferramentas de desenvolvimento neste build.",
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Criando um Build Local para Android (`.apk`)",
		},
		{
			type: "paragraph",
			text: "Criar um build local para Android é a forma mais acessível de começar, pois não requer uma conta de desenvolvedor paga.",
		},
		{ type: "paragraph", text: "Execute o seguinte comando no seu terminal:" },
		{
			type: "code",
			language: "bash",
			code: "eas build --platform android --profile development --local",
		},
		{
			type: "list",
			items: [
				"**`--platform android`**: Especifica que queremos construir para Android.",
				'**`--profile development`**: Usa a configuração do perfil "development" do nosso `eas.json`.',
				"**`--local`**: Diz ao EAS para realizar o build na sua máquina em vez de na nuvem da Expo.",
			],
		},
		{
			type: "paragraph",
			text: "A primeira vez, isto pode demorar um pouco, pois irá descarregar as ferramentas de build nativas do Android. No final, terá um ficheiro `.apk` no seu projeto. Pode arrastar este ficheiro para o seu emulador Android ou transferi-lo para um dispositivo físico para o instalar.",
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Para builds de iOS, o processo é semelhante (`--platform ios`), mas **requer um Mac** e, para instalar num dispositivo físico, uma conta de desenvolvedor da Apple.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Executando a App no Development Build" },
		{
			type: "paragraph",
			text: "Uma vez instalado o seu build de desenvolvimento, verá o ícone da sua app no seu dispositivo. Ao abri-la, em vez de carregar o seu código JS imediatamente, mostrar-lhe-á um ecrã para digitalizar um código QR, muito semelhante ao Expo Go!",
		},
		{
			type: "paragraph",
			text: "Agora, quando executar `npx expo start` no seu projeto, pode digitalizar o QR com o seu build de desenvolvimento. A vantagem é que agora está a executar o seu código num ambiente nativo 100% fiel ao seu projeto.",
		},
	],
};
