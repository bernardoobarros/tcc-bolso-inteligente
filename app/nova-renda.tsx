import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const categorias = ['Trabalho', 'Investimento', 'Negócio', 'Outros'] as const;

export default function TelaNovaRenda() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<(typeof categorias)[number]>('Trabalho');

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <ScrollView contentContainerStyle={estilos.conteudo} showsVerticalScrollIndicator={false}>
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
          <View style={estilos.linhaValor}>
            <Text style={estilos.moeda}>R$</Text>
            <Text style={estilos.valorGrande}>0,00</Text>
          </View>

          <Text style={estilos.rotuloCampo}>DESCRIÇÃO</Text>
          <TextInput
            placeholder="Ex: Salário Mensal, Freelance UX"
            placeholderTextColor="#9CA3AF"
            style={estilos.campoTexto}
          />

          <Text style={estilos.rotuloCampo}>CATEGORIA</Text>
          <View style={estilos.gradeCategorias}>
            {categorias.map((categoria) => {
              const estaAtiva = categoria === categoriaSelecionada;

              return (
                <Pressable
                  key={categoria}
                  onPress={() => setCategoriaSelecionada(categoria)}
                  style={[
                    estilos.botaoCategoria,
                    estaAtiva && estilos.botaoCategoriaAtivo,
                  ]}>
                  <Text
                    style={[
                      estilos.textoCategoria,
                      estaAtiva && estilos.textoCategoriaAtivo,
                    ]}>
                    {categoria}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Pressable style={estilos.botaoConfirmar}>
            <Text style={estilos.textoBotaoConfirmar}>Confirmar Renda</Text>
          </Pressable>

          <Text style={estilos.textoAuxiliar}>
            Este valor será adicionado ao seu saldo do app ao confirmar o seu lançamento de renda.
          </Text>
        </View>

        <View style={estilos.cartaoDica}>
          <View style={estilos.circuloDica}>
            <Ionicons color="#6200EE" name="bulb-outline" size={14} />
          </View>
          <View style={estilos.areaTextoDica}>
            <Text style={estilos.tituloDica}>Dica do Bolso</Text>
            <Text style={estilos.textoDica}>
              Ao registrar rendas variáveis regularmente, o app consegue te ajudar a perceber melhor sua capacidade de poupança no final do mês.
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
    paddingHorizontal: 8,
    paddingTop: 12,
    paddingBottom: 24,
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
  linhaValor: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 18,
  },
  moeda: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '700',
    color: '#6200EE',
  },
  valorGrande: {
    fontSize: 42,
    lineHeight: 46,
    fontWeight: '800',
    color: '#D4D4D8',
  },
  campoTexto: {
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 13,
    color: '#202020',
    marginBottom: 18,
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
