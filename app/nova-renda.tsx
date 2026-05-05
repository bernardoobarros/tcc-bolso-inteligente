import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAplicativo } from '@/contextos/aplicativo-contexto';
import type { CategoriaRenda } from '@/tipos/aplicativo';
import { converterTextoEmValor, formatarMoeda } from '@/utils/financeiro';

const categorias: CategoriaRenda[] = ['Trabalho', 'Investimento', 'Negócio', 'Outros'];

type ErrosFormulario = {
  valor?: string;
  descricao?: string;
};

export default function TelaNovaRenda() {
  const { adicionarRenda } = useAplicativo();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoriaRenda>('Trabalho');
  const [valorTexto, setValorTexto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erros, setErros] = useState<ErrosFormulario>({});

  const valorNumerico = useMemo(() => converterTextoEmValor(valorTexto), [valorTexto]);

  function salvarRenda() {
    const novosErros: ErrosFormulario = {};

    if (valorNumerico <= 0) {
      novosErros.valor = 'Informe um valor mensal maior que zero.';
    }

    if (descricao.trim().length < 3) {
      novosErros.descricao = 'Descreva a fonte de renda com pelo menos 3 caracteres.';
    }

    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      return;
    }

    adicionarRenda({
      descricao: descricao.trim(),
      categoria: categoriaSelecionada,
      valorMensal: valorNumerico,
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
          <Text style={estilos.tituloCabecalho}>Nova Renda</Text>
          <View style={estilos.espacadorCabecalho} />
        </View>

        <View style={estilos.cartaoPrincipal}>
          <View style={estilos.iconePrincipal}>
            <Ionicons color="#6200EE" name="wallet-outline" size={18} />
          </View>

          <Text style={estilos.titulo}>Quanto você recebeu?</Text>
          <Text style={estilos.subtitulo}>Registre sua nova fonte de renda mensal.</Text>

          <Text style={estilos.rotuloCampo}>VALOR MENSAL</Text>
          <TextInput
            keyboardType="decimal-pad"
            onChangeText={setValorTexto}
            placeholder="0,00"
            placeholderTextColor="#9CA3AF"
            style={[estilos.campoTexto, erros.valor && estilos.campoComErro]}
            value={valorTexto}
          />
          <Text style={estilos.valorCalculado}>{formatarMoeda(valorNumerico || 0)}</Text>
          {erros.valor ? <Text style={estilos.textoErro}>{erros.valor}</Text> : null}

          <Text style={estilos.rotuloCampo}>DESCRIÇÃO</Text>
          <TextInput
            onChangeText={setDescricao}
            placeholder="Ex: Salário mensal, consultoria, aluguel"
            placeholderTextColor="#9CA3AF"
            style={[estilos.campoTexto, erros.descricao && estilos.campoComErro]}
            value={descricao}
          />
          {erros.descricao ? <Text style={estilos.textoErro}>{erros.descricao}</Text> : null}

          <Text style={estilos.rotuloCampo}>CATEGORIA</Text>
          <View style={estilos.gradeCategorias}>
            {categorias.map((categoria) => {
              const estaAtiva = categoria === categoriaSelecionada;

              return (
                <Pressable
                  key={categoria}
                  onPress={() => setCategoriaSelecionada(categoria)}
                  style={[estilos.botaoCategoria, estaAtiva && estilos.botaoCategoriaAtivo]}>
                  <Text
                    style={[estilos.textoCategoria, estaAtiva && estilos.textoCategoriaAtivo]}>
                    {categoria}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Pressable onPress={salvarRenda} style={estilos.botaoConfirmar}>
            <Text style={estilos.textoBotaoConfirmar}>Confirmar Renda</Text>
          </Pressable>

          <Text style={estilos.textoAuxiliar}>
            Esta renda entra na área de fontes e atualiza o saldo do dashboard automaticamente.
          </Text>
        </View>

        <View style={estilos.cartaoDica}>
          <View style={estilos.circuloDica}>
            <Ionicons color="#6200EE" name="bulb-outline" size={14} />
          </View>
          <View style={estilos.areaTextoDica}>
            <Text style={estilos.tituloDica}>Dica do Bolso</Text>
            <Text style={estilos.textoDica}>
              Registre rendas variáveis sempre com a mesma descrição para acompanhar sua evolução.
            </Text>
          </View>
        </View>
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
    marginBottom: 16,
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
  espacadorCabecalho: {
    width: 28,
    height: 28,
  },
  cartaoPrincipal: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: 18,
    shadowColor: '#111827',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    marginBottom: 16,
  },
  iconePrincipal: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  titulo: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '800',
    color: '#202020',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 12,
    lineHeight: 16,
    color: '#71717A',
    marginBottom: 18,
  },
  rotuloCampo: {
    fontSize: 9,
    lineHeight: 12,
    letterSpacing: 0.8,
    color: '#71717A',
    marginBottom: 8,
  },
  campoTexto: {
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 13,
    color: '#202020',
    marginBottom: 6,
  },
  campoComErro: {
    borderWidth: 1,
    borderColor: '#DC2626',
  },
  valorCalculado: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '800',
    color: '#6200EE',
    marginBottom: 8,
  },
  textoErro: {
    fontSize: 11,
    lineHeight: 15,
    color: '#DC2626',
    marginBottom: 12,
  },
  gradeCategorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  botaoCategoria: {
    minWidth: '47%',
    minHeight: 40,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  botaoCategoriaAtivo: {
    backgroundColor: '#6200EE',
  },
  textoCategoria: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#202020',
  },
  textoCategoriaAtivo: {
    color: '#FFFFFF',
  },
  botaoConfirmar: {
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
    marginBottom: 12,
  },
  textoBotaoConfirmar: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  textoAuxiliar: {
    fontSize: 10,
    lineHeight: 14,
    color: '#71717A',
    textAlign: 'center',
  },
  cartaoDica: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    padding: 14,
    flexDirection: 'row',
    gap: 10,
  },
  circuloDica: {
    width: 24,
    height: 24,
    borderRadius: 999,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  areaTextoDica: {
    flex: 1,
  },
  tituloDica: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: '#202020',
    marginBottom: 4,
  },
  textoDica: {
    fontSize: 11,
    lineHeight: 16,
    color: '#71717A',
  },
});
