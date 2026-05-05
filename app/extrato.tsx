import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import { CabecalhoAplicativo } from '@/components/aplicativo/cabecalho-aplicativo';
import { TelaAplicativo } from '@/components/aplicativo/tela-aplicativo';
import { useAplicativo } from '@/contextos/aplicativo-contexto';
import { ehMesmoMes, formatarHorario, formatarMesCurto, formatarMoeda, obterRotuloData } from '@/utils/financeiro';

type TransacaoExtrato = {
  id: string;
  titulo: string;
  subtitulo: string;
  valor: number;
  detalhe: string;
  tipo: 'entrada' | 'saida';
  data: number;
  icone: keyof typeof Ionicons.glyphMap;
};

const iconesCategoria: Record<string, keyof typeof Ionicons.glyphMap> = {
  Alimentação: 'restaurant-outline',
  Transporte: 'bus-outline',
  Moradia: 'home-outline',
  Lazer: 'film-outline',
  Compras: 'bag-handle-outline',
  Trabalho: 'briefcase-outline',
  Investimento: 'trending-up-outline',
  Negócio: 'wallet-outline',
};

export default function TelaExtrato() {
  const { rendas, despesas } = useAplicativo();
  const opcoesMes = useMemo(() => criarOpcoesMes(), []);
  const [indiceMesSelecionado, setIndiceMesSelecionado] = useState(1);

  const transacoes = useMemo<TransacaoExtrato[]>(() => {
    const transacoesRenda = rendas.map((renda) => ({
      id: renda.id,
      titulo: renda.descricao,
      subtitulo: `Renda • ${formatarHorario(renda.dataCriacao)}`,
      valor: renda.valorMensal,
      detalhe: renda.tipoFonte === 'principal' ? 'RENDA PRINCIPAL' : 'RENDA EXTRA',
      tipo: 'entrada' as const,
      data: renda.dataCriacao,
      icone: iconesCategoria[renda.categoria] ?? 'wallet-outline',
    }));

    const transacoesDespesa = despesas.map((despesa) => ({
      id: despesa.id,
      titulo: despesa.descricao,
      subtitulo: `${despesa.categoria} • ${formatarHorario(despesa.data)}`,
      valor: despesa.valor,
      detalhe: despesa.contaPagamento.toUpperCase(),
      tipo: 'saida' as const,
      data: despesa.data,
      icone: iconesCategoria[despesa.categoria] ?? 'receipt-outline',
    }));

    return [...transacoesRenda, ...transacoesDespesa].sort((a, b) => b.data - a.data);
  }, [despesas, rendas]);

  const referenciaMes = opcoesMes[indiceMesSelecionado].data;
  const transacoesFiltradas = useMemo(
    () => transacoes.filter((transacao) => ehMesmoMes(transacao.data, referenciaMes)),
    [referenciaMes, transacoes],
  );

  const totais = useMemo(() => {
    const entradas = transacoesFiltradas
      .filter((transacao) => transacao.tipo === 'entrada')
      .reduce((total, transacao) => total + transacao.valor, 0);
    const saidas = transacoesFiltradas
      .filter((transacao) => transacao.tipo === 'saida')
      .reduce((total, transacao) => total + transacao.valor, 0);

    return {
      entradas,
      saidas,
      saldo: entradas - saidas,
    };
  }, [transacoesFiltradas]);

  const grupos = useMemo(() => {
    const mapa = new Map<string, TransacaoExtrato[]>();

    transacoesFiltradas.forEach((transacao) => {
      const chave = obterRotuloData(transacao.data);
      const grupoAtual = mapa.get(chave) ?? [];
      grupoAtual.push(transacao);
      mapa.set(chave, grupoAtual);
    });

    return Array.from(mapa.entries());
  }, [transacoesFiltradas]);

  return (
    <TelaAplicativo abaAtiva="extrato">
      <CabecalhoAplicativo />

      <Text style={estilos.rotuloTopo}>HISTÓRICO{'\n'}FINANCEIRO</Text>
      <View style={estilos.linhaTitulo}>
        <Text style={estilos.titulo}>Extrato</Text>
        <View style={estilos.seletorMes}>
          {opcoesMes.map((opcao, indice) => {
            const estaAtiva = indice === indiceMesSelecionado;

            return (
              <Pressable
                key={opcao.rotulo}
                onPress={() => setIndiceMesSelecionado(indice)}
                style={[estilos.pilulaMes, estaAtiva && estilos.pilulaMesAtiva]}>
                <Text style={[estilos.textoMes, estaAtiva && estilos.textoMesAtivo]}>
                  {opcao.rotulo}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={estilos.cartaoSaldoBranco}>
        <Text style={estilos.rotuloCartao}>ENTRADAS</Text>
        <Text style={[estilos.valorCartao, { color: '#6200EE' }]}>
          {formatarMoeda(totais.entradas)}
        </Text>
      </View>

      <View style={estilos.cartaoSaldoBranco}>
        <Text style={estilos.rotuloCartao}>SAÍDAS</Text>
        <Text style={[estilos.valorCartao, { color: '#DC2626' }]}>
          {formatarMoeda(totais.saidas)}
        </Text>
      </View>

      <View style={estilos.cartaoSaldoMensal}>
        <Text style={estilos.rotuloCartao}>SALDO MENSAL</Text>
        <Text style={estilos.valorSaldoMensal}>{formatarMoeda(totais.saldo)}</Text>
        <View style={estilos.linhaRoxa} />
      </View>

      {grupos.map(([rotulo, itens]) => (
        <View key={rotulo}>
          <Text style={estilos.agrupadorData}>{rotulo}</Text>
          <View style={estilos.grupoLancamentos}>
            {itens.map((transacao) => (
              <ItemTransacao key={transacao.id} transacao={transacao} />
            ))}
          </View>
        </View>
      ))}

      {grupos.length === 0 ? (
        <View style={estilos.estadoVazio}>
          <Ionicons color="#6200EE" name="receipt-outline" size={18} />
          <Text style={estilos.textoEstadoVazio}>Nenhum lançamento encontrado neste mês.</Text>
        </View>
      ) : null}
    </TelaAplicativo>
  );
}

function ItemTransacao({ transacao }: { transacao: TransacaoExtrato }) {
  const corValor = transacao.tipo === 'entrada' ? '#6200EE' : '#DC2626';
  const prefixo = transacao.tipo === 'entrada' ? '+' : '-';

  return (
    <View style={estilos.itemTransacao}>
      <View style={estilos.areaEsquerdaTransacao}>
        <View style={estilos.iconeTransacao}>
          <Ionicons color="#6200EE" name={transacao.icone} size={16} />
        </View>
        <View>
          <Text style={estilos.tituloTransacao}>{transacao.titulo}</Text>
          <Text style={estilos.subtituloTransacao}>{transacao.subtitulo}</Text>
        </View>
      </View>
      <View style={estilos.areaDireitaTransacao}>
        <Text style={[estilos.valorTransacao, { color: corValor }]}>
          {prefixo} {formatarMoeda(transacao.valor)}
        </Text>
        <Text style={estilos.detalheTransacao}>{transacao.detalhe}</Text>
      </View>
    </View>
  );
}

function criarOpcoesMes() {
  const base = new Date();

  return [-1, 0, 1].map((deslocamento) => {
    const data = new Date(base.getFullYear(), base.getMonth() + deslocamento, 1);

    return {
      rotulo: formatarMesCurto(data),
      data,
    };
  });
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
    maxWidth: 120,
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
    textAlign: 'right',
  },
  estadoVazio: {
    minHeight: 52,
    borderRadius: 18,
    backgroundColor: '#F5EEFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  textoEstadoVazio: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '600',
    color: '#6200EE',
  },
});
