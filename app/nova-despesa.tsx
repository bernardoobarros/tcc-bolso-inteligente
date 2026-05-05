import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAplicativo } from '@/contextos/aplicativo-contexto';
import type { CategoriaDespesa } from '@/tipos/aplicativo';
import {
  converterTextoEmData,
  converterTextoEmValor,
  formatarDataCurta,
  formatarMoeda,
} from '@/utils/financeiro';

const categorias = [
  { titulo: 'Alimentação' as CategoriaDespesa, icone: 'restaurant-outline' as const },
  { titulo: 'Transporte' as CategoriaDespesa, icone: 'bus-outline' as const },
  { titulo: 'Compras' as CategoriaDespesa, icone: 'bag-handle-outline' as const },
  { titulo: 'Outros' as CategoriaDespesa, icone: 'apps-outline' as const },
];

type ErrosFormulario = {
  valor?: string;
  descricao?: string;
  data?: string;
  conta?: string;
};

export default function TelaNovaDespesa() {
  const { adicionarDespesa } = useAplicativo();
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState<CategoriaDespesa>('Alimentação');
  const [repetirDespesa, setRepetirDespesa] = useState(false);
  const [valorTexto, setValorTexto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataTexto, setDataTexto] = useState(formatarDataCurta(Date.now()));
  const [contaPagamento, setContaPagamento] = useState('Carteira Principal');
  const [erros, setErros] = useState<ErrosFormulario>({});

  const valorNumerico = useMemo(() => converterTextoEmValor(valorTexto), [valorTexto]);

  function limparFormulario() {
    setCategoriaSelecionada('Alimentação');
    setRepetirDespesa(false);
    setValorTexto('');
    setDescricao('');
    setDataTexto(formatarDataCurta(Date.now()));
    setContaPagamento('Carteira Principal');
    setErros({});
  }

  function salvarDespesa() {
    const dataConvertida = converterTextoEmData(dataTexto);
    const novosErros: ErrosFormulario = {};

    if (valorNumerico <= 0) {
      novosErros.valor = 'Informe um valor maior que zero.';
    }

    if (descricao.trim().length < 3) {
      novosErros.descricao = 'Descreva a despesa com pelo menos 3 caracteres.';
    }

    if (!dataConvertida) {
      novosErros.data = 'Use a data no formato dd/mm/aaaa.';
    }

    if (contaPagamento.trim().length < 3) {
      novosErros.conta = 'Informe a conta de pagamento.';
    }

    setErros(novosErros);

    if (Object.keys(novosErros).length > 0 || !dataConvertida) {
      return;
    }

    adicionarDespesa({
      descricao: descricao.trim(),
      categoria: categoriaSelecionada,
      valor: valorNumerico,
      data: dataConvertida,
      contaPagamento: contaPagamento.trim(),
      repetir: repetirDespesa,
    });

    router.back();
  }

  return (
    <SafeAreaView edges={['top', 'bottom']} style={estilos.areaSegura}>
      <ScrollView
        contentContainerStyle={estilos.conteudo}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={estilos.cabecalho}>
          <Pressable onPress={() => router.back()} style={estilos.botaoVoltar}>
            <Ionicons color="#202020" name="close" size={18} />
          </Pressable>
          <Text style={estilos.tituloCabecalho}>Nova Despesa</Text>
          <View style={estilos.avatar}>
            <Ionicons color="#F6C8A6" name="person" size={15} />
          </View>
        </View>

        <Text style={estilos.rotuloTopo}>VALOR DA TRANSAÇÃO</Text>
        <TextInput
          keyboardType="decimal-pad"
          onChangeText={setValorTexto}
          placeholder="0,00"
          placeholderTextColor="#9CA3AF"
          style={[estilos.campoValor, erros.valor && estilos.campoComErro]}
          value={valorTexto}
        />
        <Text style={estilos.valorPreview}>{formatarMoeda(valorNumerico || 0)}</Text>
        {erros.valor ? <Text style={estilos.textoErro}>{erros.valor}</Text> : null}

        <View style={estilos.seletorTipo}>
          <View style={estilos.pilulaTipo}>
            <Text style={estilos.textoTipo}>BRL</Text>
          </View>
          <View style={[estilos.pilulaTipo, estilos.pilulaTipoAtiva]}>
            <Text style={estilos.textoTipoAtivo}>Despesa</Text>
          </View>
        </View>

        <Text style={estilos.rotuloSecao}>Categoria</Text>
        <View style={estilos.gradeCategorias}>
          {categorias.map((categoria) => {
            const estaAtiva = categoria.titulo === categoriaSelecionada;

            return (
              <Pressable
                key={categoria.titulo}
                onPress={() => setCategoriaSelecionada(categoria.titulo)}
                style={[estilos.itemCategoria, estaAtiva && estilos.itemCategoriaAtivo]}>
                <Ionicons
                  color={estaAtiva ? '#6200EE' : '#71717A'}
                  name={categoria.icone}
                  size={18}
                />
                <Text
                  style={[estilos.textoCategoria, estaAtiva && estilos.textoCategoriaAtivo]}>
                  {categoria.titulo}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={estilos.rotuloSecao}>DESCRIÇÃO</Text>
        <TextInput
          onChangeText={setDescricao}
          placeholder="Ex: Almoço executivo"
          placeholderTextColor="#9CA3AF"
          style={[estilos.campoTexto, erros.descricao && estilos.campoComErro]}
          value={descricao}
        />
        {erros.descricao ? <Text style={estilos.textoErro}>{erros.descricao}</Text> : null}

        <Text style={estilos.rotuloSecao}>DATA</Text>
        <TextInput
          keyboardType="number-pad"
          onChangeText={setDataTexto}
          placeholder="dd/mm/aaaa"
          placeholderTextColor="#9CA3AF"
          style={[estilos.campoTexto, erros.data && estilos.campoComErro]}
          value={dataTexto}
        />
        {erros.data ? <Text style={estilos.textoErro}>{erros.data}</Text> : null}

        <Text style={estilos.rotuloSecao}>CONTA DE PAGAMENTO</Text>
        <TextInput
          onChangeText={setContaPagamento}
          placeholder="Carteira Principal"
          placeholderTextColor="#9CA3AF"
          style={[estilos.campoTexto, erros.conta && estilos.campoComErro]}
          value={contaPagamento}
        />
        {erros.conta ? <Text style={estilos.textoErro}>{erros.conta}</Text> : null}

        <View style={estilos.cartaoLinha}>
          <View style={estilos.linhaEsquerda}>
            <View style={estilos.iconeLinha}>
              <Ionicons color="#6200EE" name="repeat-outline" size={16} />
            </View>
            <View style={estilos.textosCartaoLinha}>
              <Text style={estilos.tituloLinha}>Repetir despesa</Text>
              <Text style={estilos.subtituloLinha}>Mensal, quinzenal...</Text>
            </View>
          </View>
          <Switch
            ios_backgroundColor="#E5E7EB"
            onValueChange={setRepetirDespesa}
            thumbColor="#FFFFFF"
            trackColor={{ false: '#E5E7EB', true: '#C4B5FD' }}
            value={repetirDespesa}
          />
        </View>

        <View style={estilos.cartaoLinha}>
          <View style={estilos.linhaEsquerda}>
            <View style={[estilos.iconeLinha, estilos.iconeLinhaLaranja]}>
              <Ionicons color="#C2410C" name="receipt-outline" size={16} />
            </View>
            <View style={estilos.textosCartaoLinha}>
              <Text style={estilos.tituloLinha}>Anexar comprovante</Text>
              <Text style={estilos.subtituloLinha}>PDF, JPG ou PNG</Text>
            </View>
          </View>
          <Text style={estilos.textoAcaoLinha}>ADICIONAR</Text>
        </View>

        <Pressable onPress={salvarDespesa} style={estilos.botaoPrimario}>
          <Text style={estilos.textoBotaoPrimario}>SALVAR DESPESA</Text>
        </Pressable>

        <Pressable onPress={limparFormulario} style={estilos.botaoSecundario}>
          <Text style={estilos.textoBotaoSecundario}>LIMPAR FORMULÁRIO</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  conteudo: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 32,
    flexGrow: 1,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  botaoVoltar: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tituloCabecalho: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
    color: '#202020',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rotuloTopo: {
    fontSize: 9,
    lineHeight: 12,
    letterSpacing: 0.8,
    color: '#71717A',
    textAlign: 'center',
    marginBottom: 8,
  },
  campoValor: {
    minHeight: 54,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#202020',
    marginBottom: 8,
  },
  valorPreview: {
    textAlign: 'center',
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
    color: '#202020',
    marginBottom: 10,
  },
  campoComErro: {
    borderWidth: 1,
    borderColor: '#DC2626',
  },
  textoErro: {
    fontSize: 11,
    lineHeight: 15,
    color: '#DC2626',
    marginBottom: 12,
  },
  seletorTipo: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  pilulaTipo: {
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  pilulaTipoAtiva: {
    backgroundColor: '#EFE7FF',
  },
  textoTipo: {
    fontSize: 11,
    lineHeight: 14,
    color: '#71717A',
  },
  textoTipoAtivo: {
    fontSize: 11,
    lineHeight: 14,
    color: '#6200EE',
    fontWeight: '600',
  },
  rotuloSecao: {
    fontSize: 10,
    lineHeight: 13,
    letterSpacing: 0.8,
    color: '#71717A',
    marginBottom: 8,
  },
  gradeCategorias: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  itemCategoria: {
    width: '23%',
    minHeight: 62,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#111827',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    paddingHorizontal: 6,
  },
  itemCategoriaAtivo: {
    backgroundColor: '#F3E8FF',
  },
  textoCategoria: {
    fontSize: 9,
    lineHeight: 12,
    color: '#71717A',
    textAlign: 'center',
  },
  textoCategoriaAtivo: {
    color: '#6200EE',
    fontWeight: '600',
  },
  campoTexto: {
    minHeight: 46,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 13,
    color: '#202020',
    marginBottom: 6,
  },
  cartaoLinha: {
    minHeight: 58,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  linhaEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  textosCartaoLinha: {
    flex: 1,
  },
  iconeLinha: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconeLinhaLaranja: {
    backgroundColor: '#FFEDD5',
  },
  tituloLinha: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: '#202020',
  },
  subtituloLinha: {
    fontSize: 10,
    lineHeight: 14,
    color: '#71717A',
  },
  textoAcaoLinha: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    color: '#6200EE',
    marginLeft: 12,
  },
  botaoPrimario: {
    height: 48,
    borderRadius: 999,
    backgroundColor: '#6200EE',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6200EE',
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    marginTop: 8,
    marginBottom: 10,
  },
  textoBotaoPrimario: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  botaoSecundario: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotaoSecundario: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    color: '#71717A',
    letterSpacing: 0.8,
  },
});
