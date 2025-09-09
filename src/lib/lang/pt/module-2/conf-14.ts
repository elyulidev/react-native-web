import type { CurriculumTopic } from "../../../../types/types";

export const conference14: CurriculumTopic = {
	id: "conf-14",
	title: "Conf. 14: Hooks Personalizados",
	content: [
		{ type: "heading", text: "Hooks Personalizados e Reutilização de Lógica" },
		{
			type: "paragraph",
			text: "Os Hooks Personalizados são uma das características mais poderosas do React. Permitem-nos extrair a lógica de estado de um componente para que possa ser reutilizada de forma independente. Se se encontrar a escrever a mesma lógica de estado em vários componentes (como gerir o carregamento de dados, subscrições, etc.), é o momento perfeito para criar um Hook Personalizado.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Princípios Fundamentais" },
		{
			type: "list",
			items: [
				"**Nomenclatura:** Um Hook Personalizado é uma função JavaScript cujo nome começa com `use`. Por exemplo, `useTheme`, `useFetchData`, `useDebounce`.",
				"**Composição:** Podem chamar outros Hooks dentro deles (ex. `useState`, `useEffect`, `useContext`).",
				"**Não partilham estado:** Cada vez que usa um Hook Personalizado num componente, obtém um estado completamente novo e independente. Os hooks reutilizam a *lógica*, não o *estado*.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Exemplo Prático 1: `useToggle`" },
		{
			type: "paragraph",
			text: "Um caso de uso muito comum é ter um estado booleano que alterna (como para um modal ou um menu pendente). Em vez de escrever `const [isOpen, setIsOpen] = useState(false);` e a função `toggle` cada vez, podemos criar um hook para isso.",
		},
		{
			type: "paragraph",
			text: "Crie uma pasta `hooks` na raiz do seu projeto e, dentro dela, um ficheiro `useToggle.ts`.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// hooks/useToggle.ts
import { useState, useCallback } from 'react';

export const useToggle = (initialState: boolean = false): [boolean, () => void] => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => {
    setState(prevState => !prevState);
  }, []);

  return [state, toggle];
};
`,
		},
		{
			type: "paragraph",
			text: "Agora, em qualquer componente, podemos usá-lo de forma muito mais limpa:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { View, Text, Button } from 'react-native';
import { useToggle } from '../hooks/useToggle';

const MenuComponent = () => {
  const [isOpen, toggleMenu] = useToggle(false);

  return (
    <View>
      <Button title={isOpen ? "Fechar Menu" : "Abrir Menu"} onPress={toggleMenu} />
      {isOpen && <Text>Conteúdo do menu...</Text>}
    </View>
  );
};

export default MenuComponent;
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Exemplo Prático 2: `useDebounce`" },
		{
			type: "paragraph",
			text: 'Numa barra de pesquisa, não queremos fazer um pedido à API a cada letra que o utilizador escreve. Queremos esperar que o utilizador termine de escrever. O "debouncing" é a técnica perfeita para isto, e podemos encapsulá-la num hook.',
		},
		{
			type: "code",
			language: "typescript",
			code: `
// hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Configura um temporizador para atualizar o valor debounced após o atraso
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Função de limpeza: executa se o valor mudar antes de o temporizador terminar.
    // Isto cancela o temporizador anterior e reinicia a contagem.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Apenas volta a executar se o valor ou o atraso mudarem

  return debouncedValue;
}
`,
		},
		{
			type: "paragraph",
			text: "É assim que o usaríamos num componente de pesquisa:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text } from 'react-native';
import { useDebounce } from '../hooks/useDebounce';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms de atraso

  useEffect(() => {
    // Este efeito só será executado quando debouncedSearchTerm mudar,
    // ou seja, 500ms depois de o utilizador ter parado de escrever.
    if (debouncedSearchTerm) {
      console.log(\`A pesquisar na API: \${debouncedSearchTerm}\`);
      // Aqui faria a sua chamada à API
    }
  }, [debouncedSearchTerm]);

  return (
    <View>
      <TextInput
        placeholder="Pesquisar..."
        onChangeText={setSearchTerm}
        value={searchTerm}
        className="border p-2 rounded-md"
      />
      <Text className="mt-2">A pesquisar por: {searchTerm}</Text>
      <Text>Termo debounced: {debouncedSearchTerm}</Text>
    </View>
  );
};
export default SearchComponent;
`,
		},
		{ type: "divider" },

		{
			type: "subtitle",
			id: "async-storage",
			text: "4. Uma Olhada no Armazenamento Local: AsyncStorage",
		},
		{
			type: "paragraph",
			text: "Antes da nossa tarefa prática, precisamos de uma forma de guardar dados no dispositivo do utilizador. Para dados simples, como as preferências do utilizador ou um token de sessão, o `AsyncStorage` é a ferramenta perfeita. É um sistema de armazenamento de chave-valor, assíncrono e persistente.",
		},
		{
			type: "list",
			items: [
				"**Assíncrono:** Todas as suas operações (`setItem`, `getItem`) devolvem Promessas, pelo que devem ser usadas com `async/await`.",
				"**Chave-Valor:** Guarda um valor associado a uma chave única.",
				"**Apenas Strings:** Muito importante! O `AsyncStorage` só pode guardar valores do tipo string. Para guardar objetos ou arrays, primeiro deve convertê-los para uma string JSON usando `JSON.stringify()`, e para os ler, deve fazer o parse de volta com `JSON.parse()`.",
			],
		},
		{
			type: "code",
			language: "javascript",
			code: `
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Guardar dados ---
const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // erro ao guardar
    console.error("Erro ao guardar no AsyncStorage", e);
  }
};

// --- Ler dados ---
const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // erro ao ler
    console.error("Erro ao ler do AsyncStorage", e);
  }
};

// --- Exemplo de uso ---
const profile = { name: 'João', theme: 'dark' };
await storeData('userProfile', profile);

const loadedProfile = await getData('userProfile');
console.log(loadedProfile.name); // 'João'
`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Com este conhecimento sobre `AsyncStorage`, agora tem tudo o que precisa para abordar a seguinte tarefa prática.",
		},

		{
			type: "subtitle",
			text: "5. Tarefa Prática: Criar um Hook `usePersistentState`",
		},
		{
			type: "paragraph",
			text: "Vamos criar um hook que atue como o `useState`, mas que também guarde o valor no armazenamento local do dispositivo usando o `AsyncStorage`. Isto é incrivelmente útil para lembrar as preferências do utilizador, como o tema da aplicação.",
		},
		{
			type: "assignment",
			assignmentId: "conf-14-persistent-state-hook",
			description: [
				"**Requisitos:**",
				"1. O seu hook deve chamar-se `usePersistentState`.",
				"2. Deve aceitar uma chave (`key`) e um valor inicial (`initialValue`).",
				"3. Deve devolver um array com o estado atual e uma função para o atualizar, tal como o `useState`.",
				"4. Ao iniciar, deve tentar ler o valor do `AsyncStorage` usando a chave. Se não encontrar nada, deve usar o `initialValue`.",
				"5. Cada vez que o estado mudar, deve guardar automaticamente o novo valor no `AsyncStorage`.",
			],
			code: `
// hooks/usePersistentState.js (A sua solução aqui)
// Precisará de importar 'useState', 'useEffect' e 'AsyncStorage'
// Dica: O AsyncStorage é assíncrono, por isso o carregamento inicial deve ser feito num useEffect.

// --- Como usá-lo (para testar o seu hook) ---
import { View, Text, Button } from 'react-native';
import { usePersistentState } from './hooks/usePersistentState'; // Ajuste o caminho

export default function CounterComponent() {
  // Usamos o hook para um contador que sobrevive aos reinícios da app
  const [count, setCount] = usePersistentState('counter', 0);

  return (
    <View className="items-center">
      <Text className="text-2xl">Contador: {count}</Text>
      <Button title="Incrementar" onPress={() => setCount(count + 1)} />
    </View>
  );
}
`,
		},
	],
};
