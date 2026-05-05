import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAplicativo } from '@/contextos/aplicativo-contexto';
import { converterTextoEmValor, formatarMoeda } from '@/utils/financeiro';

type ErrosFormulario = {
  titulo?: string;
  categoria?: string;
  valorAtual?: string;
  valorMeta?: string;
};

export default function TelaNovaReserva() {
  const { adicionarReserva } = useAplicativo();
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [valorAtualTexto, setValorAtualTexto] = useState('');
  const [valorMetaTexto, setValorMetaTexto] = useState('');
  const [erros, setErros] = useState<ErrosFormulario>({});

  const valorAtual = useMemo(() => converterTextoEmValor(valorAtualTexto), [valorAtualTexto]);
  const valorMeta = useMemo(() => converterTextoEmValor(valorMetaTexto), [valorMetaTexto]);

  function salvarReserva() {
    const novosErros: ErrosFormulario = {};

    if (titulo.trim().length < 3) {
      novosErros.titulo = 'Informe um nome para a reserva.';
    }

    if (categoria.trim().length < 3) {
      novosErros.categoria = 'Informe a categoria da reserva.';
    }

    if (valorAtual < 0) {
      novosErros.valorAtual = 'O valor atual não pode ser negativo.';
    }

    if (valorMeta <= 0) {
      novosErros.valorMeta = 'Defina uma meta maior que zero.';
    }

    if (valorAtual > valorMeta && valorMeta > 0) {
      novosErros.valorAtual = 'O valor atual não pode ultrapassar a meta.';
    }

    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      return;
    }

    adicionarReserva({
      titulo: titulo.trim(),
      categoria: categoria.trim(),
      valorAtual,
      valorMeta,
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
          <Text style={estilos.tituloCabecalho}>Nova Reserva</Text>
          <View style={estilos.espacadorCabecalho} />
        </View>

        <View style={estilos.cartaoPrincipal}>
          <View style={estilos.iconePrincipal}>
            <Ionicons color="#6200EE" name="shield-checkmark-outline" size={18} />
          </View>

          <Text style={estilos.titulo}>Qual objetivo você quer criar?</Text>
          <Text style={estilos.subtitulo}>
            Registre sua reserva para acompanhar o progresso no app.
          </Text>

          <Text style={estilos.rotuloCampo}>NOME DA RESERVA</Text>
          <TextInput
            onChangeText={setTitulo}
            placeholder="Ex: Reserva de emergência"
            placeholderTextColor="#9CA3AF"
            style={[estilos.campoTexto, erros.titulo && estilos.campoComErro]}
            value={titulo}
          />
          {erros.titulo ? <Text style={estilos.textoErro}>{erros.titulo}</Text> : null}

          <Text style={estilos.rotuloCampo}>CATEGORIA</Text>
          <TextInput
            onChangeText={setCategoria}
            placeholder="Ex: Essencial, lazer, aquisição"
            placeholderTextColor="#9CA3AF"
            style={[estilos.campoTexto, erros.categoria && estilos.campoComErro]}
            value={categoria}
          />
          {erros.categoria ? <Text style={estilos.textoErro}>{erros.categoria}</Text> : null}

          <Text style={estilos.rotuloCampo}>VALOR ATUAL</Text>
          <TextInput
            keyboardType="decimal-pad"
            onChangeText={setValorAtualTexto}
            placeholder="0,00"
            placeholderTextColor="#9CA3AF"
            style={[estilos.campoTexto, erros.valorAtual && estilos.campoComErro]}
            value={valorAtualTexto}
          />
          <Text style={estilos.valorAuxiliar}>{formatarMoeda(valorAtual || 0)}</Text>
          {erros.valorAtual ? <Text style={estilos.textoErro}>{erros.valorAtual}</Text> : null}

          <Text style={estilos.rotuloCampo}>META FINAL</Text>
          <TextInput
            keyboardType="decimal-pad"
            onChangeText={setValorMetaTexto}
            placeholder="0,00"
            placeholderTextColor="#9CA3AF"
            style={[estilos.campoTexto, erros.valorMeta && estilos.campoComErro]}
            value={valorMetaTexto}
          />
          <Text style={estilos.valorAuxiliar}>{formatarMoeda(valorMeta || 0)}</Text>
          {erros.valorMeta ? <Text style={estilos.textoErro}>{erros.valorMeta}</Text> : null}

          <Pressable onPress={salvarReserva} style={estilos.botaoConfirmar}>
            <Text style={estilos.textoBotaoConfirmar}>Salvar Reserva</Text>
          </Pressable>
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
  valorAuxiliar: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    color: '#6200EE',
    marginBottom: 8,
  },
  textoErro: {
    fontSize: 11,
    lineHeight: 15,
    color: '#DC2626',
    marginBottom: 12,
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
    marginTop: 8,
  },
  textoBotaoConfirmar: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
