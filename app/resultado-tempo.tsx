import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CabecalhoAplicativo } from '@/components/aplicativo/cabecalho-aplicativo';
import { TelaAplicativo } from '@/components/aplicativo/tela-aplicativo';

export default function TelaResultadoTempo() {
  const parametros = useLocalSearchParams<{
    valorProduto?: string;
    valorHora?: string;
  }>();

  const valorProduto = Number(parametros.valorProduto ?? '0');
  const valorHora = Number(parametros.valorHora ?? '0');
  const totalHoras = valorHora > 0 ? valorProduto / valorHora : 0;
  const horasInteiras = Math.floor(totalHoras);
  const minutos = Math.round((totalHoras - horasInteiras) * 60);
  const textoHoras = `${String(horasInteiras).padStart(2, '0')}:${String(minutos).padStart(2, '0')}h`;

  return (
    <TelaAplicativo abaAtiva="tempo">
      <CabecalhoAplicativo />

      <Text style={estilos.rotuloTopo}>CALCULADORA DE TEMPO</Text>
      <Text style={estilos.titulo}>Horas necessárias</Text>

      <View style={estilos.cartaoPrincipal}>
        <Text style={estilos.rotuloPrincipal}>VOCÊ PRECISA TRABALHAR</Text>
        <View style={estilos.linhaTempo}>
          <Text style={estilos.tempoPrincipal}>{textoHoras}</Text>
        </View>
        <View style={estilos.seloPrincipal}>
          <Text style={estilos.textoSelo}>para comprar este produto</Text>
        </View>
      </View>

      <View style={estilos.cartaoSecundario}>
        <View style={estilos.linhaCabecalhoSecundario}>
          <Text style={estilos.iconeSecundario}>🛍️</Text>
          <Text style={estilos.rotuloSecundario}>VALOR DO PRODUTO</Text>
        </View>
        <Text style={estilos.valorSecundario}>{formatarMoeda(valorProduto)}</Text>
      </View>

      <View style={estilos.cartaoSecundario}>
        <View style={estilos.linhaCabecalhoSecundario}>
          <Text style={estilos.iconeSecundario}>💳</Text>
          <Text style={estilos.rotuloSecundario}>VALOR DA SUA HORA</Text>
        </View>
        <Text style={estilos.valorSecundario}>{formatarMoeda(valorHora)}</Text>
      </View>

      <Pressable onPress={() => router.replace('/tempo')} style={estilos.botaoPrimario}>
        <Text style={estilos.textoBotaoPrimario}>Novo cálculo</Text>
      </Pressable>

      <Pressable onPress={() => router.replace('/dashboard')} style={estilos.botaoSecundario}>
        <Text style={estilos.textoBotaoSecundario}>Voltar ao início</Text>
      </Pressable>

      <View style={estilos.cartaoDica}>
        <Text style={estilos.iconeDica}>💡</Text>
        <Text style={estilos.textoDica}>
          Dica do Bolso: se essa compra exigir muitas horas de trabalho, vale comparar com suas prioridades do mês.
        </Text>
      </View>
    </TelaAplicativo>
  );
}

function formatarMoeda(valor: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

const estilos = StyleSheet.create({
  rotuloTopo: {
    fontSize: 10,
    lineHeight: 13,
    letterSpacing: 0.8,
    color: '#71717A',
    marginBottom: 8,
  },
  titulo: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    color: '#202020',
    marginBottom: 16,
  },
  cartaoPrincipal: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    padding: 18,
    shadowColor: '#111827',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    marginBottom: 16,
  },
  rotuloPrincipal: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.8,
    color: '#71717A',
    textAlign: 'center',
    marginBottom: 10,
  },
  linhaTempo: {
    alignItems: 'center',
    marginBottom: 12,
  },
  tempoPrincipal: {
    fontSize: 52,
    lineHeight: 58,
    fontWeight: '800',
    color: '#202020',
  },
  seloPrincipal: {
    alignSelf: 'center',
    borderRadius: 999,
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  textoSelo: {
    fontSize: 11,
    lineHeight: 14,
    color: '#6200EE',
    fontWeight: '600',
  },
  cartaoSecundario: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    padding: 16,
    shadowColor: '#111827',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    marginBottom: 14,
  },
  linhaCabecalhoSecundario: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  iconeSecundario: {
    fontSize: 14,
  },
  rotuloSecundario: {
    fontSize: 10,
    lineHeight: 13,
    letterSpacing: 0.8,
    color: '#71717A',
  },
  valorSecundario: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
    color: '#202020',
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
    marginBottom: 12,
  },
  textoBotaoPrimario: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  botaoSecundario: {
    height: 44,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  textoBotaoSecundario: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
    color: '#202020',
  },
  cartaoDica: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    padding: 14,
  },
  iconeDica: {
    fontSize: 14,
    marginBottom: 8,
  },
  textoDica: {
    fontSize: 13,
    lineHeight: 19,
    color: '#202020',
  },
});
