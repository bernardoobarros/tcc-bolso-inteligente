import { type Href, router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { CabecalhoAplicativo } from '@/components/aplicativo/cabecalho-aplicativo';
import { TelaAplicativo } from '@/components/aplicativo/tela-aplicativo';

export default function TelaTempo() {
  const [valorProduto, setValorProduto] = useState('');
  const [valorHora, setValorHora] = useState('');

  const valorProdutoNumerico = useMemo(
    () => converterTextoEmValor(valorProduto),
    [valorProduto],
  );
  const valorHoraNumerico = useMemo(
    () => converterTextoEmValor(valorHora),
    [valorHora],
  );
  const calculoDisponivel = valorProdutoNumerico > 0 && valorHoraNumerico > 0;

  function calcularTempo() {
    if (!calculoDisponivel) {
      return;
    }

    router.push({
      pathname: '/resultado-tempo' as Href,
      params: {
        valorProduto: String(valorProdutoNumerico),
        valorHora: String(valorHoraNumerico),
      },
    });
  }

  return (
    <TelaAplicativo abaAtiva="tempo">
      <CabecalhoAplicativo titulo="Quanto custa em horas?" tituloCentralizado />

      <View style={estilos.iconePrincipal}>
        <Text style={estilos.emojiRelogio}>🕒</Text>
      </View>

      <Text style={estilos.titulo}>Pense em tempo, não em dinheiro.</Text>
      <Text style={estilos.subtitulo}>
        Descubra quantas horas de trabalho este desejo realmente custa para o seu bolso.
      </Text>

      <View style={estilos.cartaoFormulario}>
        <View style={estilos.blocoCampo}>
          <Text style={estilos.rotuloCampo}>VALOR DO PRODUTO</Text>
          <View style={estilos.campo}>
            <Text style={estilos.prefixoCampo}>R$</Text>
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={setValorProduto}
              placeholder="0,00"
              placeholderTextColor="#9CA3AF"
              style={estilos.input}
              value={valorProduto}
            />
          </View>
        </View>

        <View style={estilos.blocoCampo}>
          <Text style={estilos.rotuloCampo}>VALOR DA SUA HORA</Text>
          <View style={estilos.campo}>
            <Text style={estilos.prefixoCampo}>R$</Text>
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={setValorHora}
              placeholder="0,00"
              placeholderTextColor="#9CA3AF"
              style={estilos.input}
              value={valorHora}
            />
          </View>
        </View>

        <Pressable
          disabled={!calculoDisponivel}
          onPress={calcularTempo}
          style={[
            estilos.botaoCalcular,
            !calculoDisponivel && estilos.botaoCalcularDesabilitado,
          ]}>
          <Text style={estilos.textoBotaoCalcular}>CALCULAR</Text>
        </Pressable>
      </View>

      <View style={estilos.cartaoDica}>
        <Text style={estilos.iconeCartao}>💡</Text>
        <Text style={estilos.tituloCartaoClaro}>Dica Financeira</Text>
        <Text style={estilos.textoCartaoClaro}>
          Se o produto custar mais de 20 horas de trabalho, reflita por 48 horas antes de comprar.
        </Text>
      </View>

      <View style={estilos.cartaoRoxo}>
        <Text style={estilos.iconeCartaoRoxo}>↗</Text>
        <Text style={estilos.tituloCartaoRoxo}>Meta de Carreira</Text>
        <Text style={estilos.textoCartaoRoxo}>
          Aumentar o valor da sua hora em 15% este ano reduzirá seu esforço de compra significativamente.
        </Text>
      </View>

      <View style={estilos.imagemDecorativa}>
        <Text style={estilos.moedas}>🪙 🪙 🪙</Text>
      </View>
    </TelaAplicativo>
  );
}

function converterTextoEmValor(texto: string) {
  const textoLimpo = texto
    .replace(/[^\d,.-]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  const valor = Number(textoLimpo);

  return Number.isFinite(valor) ? valor : 0;
}

const estilos = StyleSheet.create({
  iconePrincipal: {
    width: 54,
    height: 54,
    borderRadius: 999,
    backgroundColor: '#EFE7FF',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 18,
  },
  emojiRelogio: {
    fontSize: 24,
  },
  titulo: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '800',
    color: '#202020',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  subtitulo: {
    fontSize: 14,
    lineHeight: 19,
    color: '#71717A',
    textAlign: 'center',
    marginBottom: 18,
    paddingHorizontal: 14,
  },
  cartaoFormulario: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    padding: 18,
    shadowColor: '#111827',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    marginBottom: 18,
  },
  blocoCampo: {
    marginBottom: 16,
  },
  rotuloCampo: {
    fontSize: 10,
    lineHeight: 13,
    letterSpacing: 0.8,
    color: '#71717A',
    marginBottom: 8,
  },
  campo: {
    height: 40,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 8,
  },
  prefixoCampo: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: '#52525B',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#202020',
  },
  botaoCalcular: {
    marginTop: 4,
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
  },
  botaoCalcularDesabilitado: {
    backgroundColor: '#C4B5FD',
    shadowOpacity: 0,
    elevation: 0,
  },
  textoBotaoCalcular: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  cartaoDica: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    padding: 14,
    marginBottom: 16,
  },
  iconeCartao: {
    fontSize: 14,
    marginBottom: 8,
  },
  tituloCartaoClaro: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    color: '#202020',
    marginBottom: 6,
  },
  textoCartaoClaro: {
    fontSize: 13,
    lineHeight: 19,
    color: '#71717A',
  },
  cartaoRoxo: {
    borderRadius: 16,
    backgroundColor: '#6200EE',
    padding: 16,
    marginBottom: 38,
  },
  iconeCartaoRoxo: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tituloCartaoRoxo: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  textoCartaoRoxo: {
    fontSize: 13,
    lineHeight: 19,
    color: 'rgba(255,255,255,0.84)',
  },
  imagemDecorativa: {
    height: 106,
    borderRadius: 12,
    backgroundColor: '#BDBDBD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  moedas: {
    fontSize: 26,
    opacity: 0.75,
  },
});
