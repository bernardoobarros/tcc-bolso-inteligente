import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

const categorias = [
  { titulo: 'ALIMENTAÇÃO', icone: 'restaurant-outline' as const },
  { titulo: 'TRANSPORTE', icone: 'bus-outline' as const },
  { titulo: 'COMPRAS', icone: 'bag-handle-outline' as const },
  { titulo: 'OUTROS', icone: 'apps-outline' as const },
];

export default function TelaNovaDespesa() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('ALIMENTAÇÃO');
  const [repetirDespesa, setRepetirDespesa] = useState(false);

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <ScrollView contentContainerStyle={estilos.conteudo} showsVerticalScrollIndicator={false}>
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
        <View style={estilos.areaValor}>
          <Text style={estilos.moeda}>R$</Text>
          <Text style={estilos.valor}>0,00</Text>
        </View>

        <View style={estilos.seletorTipo}>
          <Pressable style={estilos.pilulaTipo}>
            <Text style={estilos.textoTipo}>BRL</Text>
          </Pressable>
          <Pressable style={[estilos.pilulaTipo, estilos.pilulaTipoAtiva]}>
            <Text style={estilos.textoTipoAtivo}>Despesa</Text>
          </Pressable>
        </View>

        <Text style={estilos.rotuloSecao}>Categoria</Text>
        <View style={estilos.gradeCategorias}>
          {categorias.map((categoria) => {
            const estaAtiva = categoria.titulo === categoriaSelecionada;

            return (
              <Pressable
                key={categoria.titulo}
                onPress={() => setCategoriaSelecionada(categoria.titulo)}
                style={[
                  estilos.itemCategoria,
                  estaAtiva && estilos.itemCategoriaAtivo,
                ]}>
                <Ionicons
                  color={estaAtiva ? '#6200EE' : '#71717A'}
                  name={categoria.icone}
                  size={18}
                />
                <Text
                  style={[
                    estilos.textoCategoria,
                    estaAtiva && estilos.textoCategoriaAtivo,
                  ]}>
                  {categoria.titulo}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={estilos.rotuloSecao}>DESCRIÇÃO</Text>
        <TextInput
          placeholder="Ex: Almoço Executivo"
          placeholderTextColor="#9CA3AF"
          style={estilos.campoTexto}
        />

        <Text style={estilos.rotuloSecao}>DATA</Text>
        <View style={estilos.campoComIcone}>
          <Text style={estilos.textoCampo}>05/24/2024</Text>
          <Ionicons color="#71717A" name="calendar-outline" size={18} />
        </View>

        <Text style={estilos.rotuloSecao}>CONTA DE PAGAMENTO</Text>
        <View style={estilos.campoComIcone}>
          <Text style={estilos.textoCampo}>Carteira Principal</Text>
          <Ionicons color="#71717A" name="chevron-down" size={18} />
        </View>

        <View style={estilos.cartaoLinha}>
          <View style={estilos.linhaEsquerda}>
            <View style={estilos.iconeLinha}>
              <Ionicons color="#6200EE" name="repeat-outline" size={16} />
            </View>
            <View>
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
            <View>
              <Text style={estilos.tituloLinha}>Anexar comprovante</Text>
              <Text style={estilos.subtituloLinha}>PDF, JPG ou PNG</Text>
            </View>
          </View>
          <Text style={estilos.textoAcaoLinha}>ADICIONAR</Text>
        </View>

        <Pressable style={estilos.botaoPrimario}>
          <Text style={estilos.textoBotaoPrimario}>SALVAR DESPESA</Text>
        </Pressable>

        <Pressable style={estilos.botaoSecundario}>
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
    paddingHorizontal: 8,
    paddingTop: 12,
    paddingBottom: 24,
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
  areaValor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  moeda: {
    fontSize: 30,
    lineHeight: 34,
    color: '#202020',
  },
  valor: {
    fontSize: 52,
    lineHeight: 58,
    fontWeight: '800',
    color: '#202020',
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
    marginBottom: 16,
  },
  campoComIcone: {
    minHeight: 46,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  textoCampo: {
    fontSize: 13,
    lineHeight: 16,
    color: '#202020',
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
