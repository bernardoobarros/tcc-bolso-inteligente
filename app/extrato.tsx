import { StyleSheet, Text, View } from 'react-native';

import { CabecalhoAplicativo } from '@/components/aplicativo/cabecalho-aplicativo';
import { TelaAplicativo } from '@/components/aplicativo/tela-aplicativo';

const transacoesHoje = [
  {
    titulo: 'Supermercado\nPremium',
    subtitulo: 'Alimentação • 14:20',
    valor: '- R$ 450,20',
    detalhe: 'DÉBITO',
    cor: '#DC2626',
    icone: '🛒',
  },
  {
    titulo: 'Salário\nMensal',
    subtitulo: 'Renda • 09:00',
    valor: '+ R$ 8.500,00',
    detalhe: 'TRANSFERÊNCIA',
    cor: '#6200EE',
    icone: '💳',
  },
];

const transacoesOntem = [
  {
    titulo: 'Posto Ipiranga',
    subtitulo: 'Transporte • 18:45',
    valor: '- R$ 280,00',
    detalhe: 'CARTÃO DE CRÉDITO',
    cor: '#DC2626',
    icone: '⛽',
  },
  {
    titulo: 'Restaurante\nSabor',
    subtitulo: 'Alimentação • 12:30',
    valor: '- R$ 85,90',
    detalhe: 'DÉBITO',
    cor: '#DC2626',
    icone: '🍴',
  },
  {
    titulo: 'Dividendos\nAções',
    subtitulo: 'Investimentos • 10:15',
    valor: '+ R$ 124,50',
    detalhe: 'RENDIMENTOS',
    cor: '#6200EE',
    icone: '📈',
  },
];

export default function TelaExtrato() {
  return (
    <TelaAplicativo abaAtiva="extrato">
      <CabecalhoAplicativo />

      <Text style={estilos.rotuloTopo}>HISTÓRICO{'\n'}FINANCEIRO</Text>
      <View style={estilos.linhaTitulo}>
        <Text style={estilos.titulo}>Extrato</Text>
        <View style={estilos.seletorMes}>
          <View style={estilos.pilulaMes}>
            <Text style={estilos.textoMes}>Out</Text>
          </View>
          <View style={[estilos.pilulaMes, estilos.pilulaMesAtiva]}>
            <Text style={estilos.textoMesAtivo}>Nov</Text>
          </View>
          <View style={estilos.pilulaMes}>
            <Text style={estilos.textoMes}>Dez</Text>
          </View>
        </View>
      </View>

      <View style={estilos.cartaoSaldoBranco}>
        <Text style={estilos.rotuloCartao}>ENTRADAS</Text>
        <Text style={[estilos.valorCartao, { color: '#6200EE' }]}>R$ 12.450,00</Text>
      </View>

      <View style={estilos.cartaoSaldoBranco}>
        <Text style={estilos.rotuloCartao}>SAÍDAS</Text>
        <Text style={[estilos.valorCartao, { color: '#DC2626' }]}>R$ 4.120,55</Text>
      </View>

      <View style={estilos.cartaoSaldoMensal}>
        <Text style={estilos.rotuloCartao}>SALDO MENSAL</Text>
        <Text style={estilos.valorSaldoMensal}>R$ 8.329,45</Text>
        <View style={estilos.linhaRoxa} />
      </View>

      <Text style={estilos.agrupadorData}>HOJE, 24 DE NOVEMBRO</Text>
      <View style={estilos.grupoLancamentos}>
        {transacoesHoje.map((transacao) => (
          <ItemTransacao key={transacao.titulo} {...transacao} />
        ))}
      </View>

      <Text style={estilos.agrupadorData}>ONTEM, 23 DE NOVEMBRO</Text>
      <View style={estilos.grupoLancamentos}>
        {transacoesOntem.map((transacao) => (
          <ItemTransacao key={transacao.titulo} {...transacao} />
        ))}
      </View>
    </TelaAplicativo>
  );
}

type PropriedadesItemTransacao = {
  titulo: string;
  subtitulo: string;
  valor: string;
  detalhe: string;
  cor: string;
  icone: string;
};

function ItemTransacao({
  titulo,
  subtitulo,
  valor,
  detalhe,
  cor,
  icone,
}: PropriedadesItemTransacao) {
  return (
    <View style={estilos.itemTransacao}>
      <View style={estilos.areaEsquerdaTransacao}>
        <View style={estilos.iconeTransacao}>
          <Text style={estilos.textoIcone}>{icone}</Text>
        </View>
        <View>
          <Text style={estilos.tituloTransacao}>{titulo}</Text>
          <Text style={estilos.subtituloTransacao}>{subtitulo}</Text>
        </View>
      </View>
      <View style={estilos.areaDireitaTransacao}>
        <Text style={[estilos.valorTransacao, { color: cor }]}>{valor}</Text>
        <Text style={estilos.detalheTransacao}>{detalhe}</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  rotuloTopo: {
    fontSize: 9,
    lineHeight: 11,
    letterSpacing: 1.4,
    color: '#71717A',
    marginBottom: 4,
  },
  linhaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  titulo: {
    fontSize: 42,
    lineHeight: 48,
    fontWeight: '800',
    color: '#202020',
  },
  seletorMes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    backgroundColor: '#EFEFF1',
    padding: 5,
  },
  pilulaMes: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  pilulaMesAtiva: {
    backgroundColor: '#6200EE',
  },
  textoMes: {
    fontSize: 12,
    lineHeight: 14,
    color: '#111827',
  },
  textoMesAtivo: {
    fontSize: 12,
    lineHeight: 14,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  cartaoSaldoBranco: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginBottom: 12,
    shadowColor: '#111827',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  rotuloCartao: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.8,
    color: '#71717A',
    marginBottom: 10,
  },
  valorCartao: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
  },
  cartaoSaldoMensal: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 12,
    marginBottom: 18,
    shadowColor: '#111827',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  valorSaldoMensal: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
    color: '#202020',
    marginBottom: 12,
  },
  linhaRoxa: {
    height: 3,
    borderRadius: 999,
    backgroundColor: '#6200EE',
    marginHorizontal: -16,
  },
  agrupadorData: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    color: '#6B7280',
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginBottom: 10,
  },
  grupoLancamentos: {
    borderRadius: 22,
    backgroundColor: '#F1F1F4',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 4,
    marginBottom: 14,
  },
  itemTransacao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  areaEsquerdaTransacao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconeTransacao: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoIcone: {
    fontSize: 16,
  },
  tituloTransacao: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '700',
    color: '#202020',
  },
  subtituloTransacao: {
    fontSize: 11,
    lineHeight: 14,
    color: '#71717A',
    marginTop: 3,
  },
  areaDireitaTransacao: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  valorTransacao: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '800',
    textAlign: 'right',
  },
  detalheTransacao: {
    fontSize: 9,
    lineHeight: 12,
    color: '#71717A',
    marginTop: 4,
  },
});
