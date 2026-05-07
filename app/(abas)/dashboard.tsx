import { router } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CabecalhoAplicativo } from '@/components/aplicativo/cabecalho-aplicativo';
import { TelaAplicativo } from '@/components/aplicativo/tela-aplicativo';
import { useAplicativo } from '@/contextos/aplicativo-contexto';
import { formatarMoeda } from '@/utils/financeiro';

const coresCategorias: Record<string, string> = {
  Moradia: '#5B21B6',
  Alimentação: '#8B5CF6',
  Transporte: '#C2410C',
  Lazer: '#52525B',
  Compras: '#2563EB',
  Outros: '#6B7280',
};

export default function TelaDashboard() {
  const { rendas, despesas, reservas, contasPagar } = useAplicativo();

  const totalRendas = useMemo(
    () => rendas.reduce((total, renda) => total + renda.valorMensal, 0),
    [rendas],
  );
  const totalDespesas = useMemo(
    () => despesas.reduce((total, despesa) => total + despesa.valor, 0),
    [despesas],
  );
  const totalReservas = useMemo(
    () => reservas.reduce((total, reserva) => total + reserva.valorAtual, 0),
    [reservas],
  );
  const saldoAtual = totalRendas - totalDespesas;

  const categoriasResumo = useMemo(() => {
    const totais = despesas.reduce<Record<string, number>>((acumulado, despesa) => {
      acumulado[despesa.categoria] = (acumulado[despesa.categoria] ?? 0) + despesa.valor;
      return acumulado;
    }, {});

    return Object.entries(totais)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([nome, valor]) => ({
        nome,
        valor,
        cor: coresCategorias[nome] ?? '#6B7280',
        largura: totalDespesas > 0 ? `${Math.max(12, Math.round((valor / totalDespesas) * 100))}%` : '0%',
      }));
  }, [despesas, totalDespesas]);

  return (
    <TelaAplicativo abaAtiva="dashboard">
      <CabecalhoAplicativo />

      <View style={estilos.cartaoSaldo}>
        <Text style={estilos.rotuloSaldo}>SALDO ATUAL</Text>
        <Text style={estilos.valorSaldo}>{formatarMoeda(saldoAtual)}</Text>
        <View style={estilos.seloSaldo}>
          <Text style={estilos.textoSelo}>{rendas.length} fontes ativas</Text>
        </View>
      </View>

      <View style={estilos.cabecalhoResumo}>
        <Text style={estilos.tituloResumo}>Resumo Mensal</Text>
        <Text style={estilos.mesResumo}>VISÃO GERAL</Text>
      </View>

      <View style={estilos.cartaoResumo}>
        <Text style={estilos.legendaResumo}>Total de despesas registradas</Text>
        <Text style={estilos.valorResumo}>{formatarMoeda(totalDespesas)}</Text>

        <View style={estilos.listaCategorias}>
          {categoriasResumo.map((categoria) => (
            <View key={categoria.nome} style={estilos.itemCategoria}>
              <View style={estilos.linhaCategoria}>
                <View style={[estilos.pontoCategoria, { backgroundColor: categoria.cor }]} />
                <Text style={estilos.nomeCategoria}>{categoria.nome}</Text>
                <Text style={estilos.valorCategoria}>{formatarMoeda(categoria.valor)}</Text>
              </View>
              <View style={estilos.trilhaCategoria}>
                <View
                  style={[
                    estilos.preenchimentoCategoria,
                    { backgroundColor: categoria.cor, width: categoria.largura },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={estilos.gradeCartoes}>
        <Pressable onPress={() => router.push('/reservas')} style={estilos.cartaoInformacao}>
          <View style={[estilos.iconeInformacao, { backgroundColor: '#F4E8FF' }]}>
            <Text style={estilos.iconeEmoji}>💟</Text>
          </View>
          <View>
            <Text style={estilos.rotuloInformacao}>RESERVAS</Text>
            <Text style={estilos.valorInformacao}>{formatarMoeda(totalReservas)}</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => router.push('/contas-a-pagar')}
          style={estilos.cartaoInformacao}>
          <View style={[estilos.iconeInformacao, { backgroundColor: '#FFEDEB' }]}>
            <Text style={estilos.iconeEmoji}>🧾</Text>
          </View>
          <View>
            <Text style={estilos.rotuloInformacao}>CONTAS A PAGAR</Text>
            <Text style={estilos.valorInformacao}>{contasPagar.length} pendentes</Text>
          </View>
        </Pressable>
      </View>

      <Pressable onPress={() => router.push('/extrato')}>
        <Text style={estilos.linkExtrato}>Ver extrato completo →</Text>
      </Pressable>
    </TelaAplicativo>
  );
}

const estilos = StyleSheet.create({
  cartaoSaldo: {
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 18,
    backgroundColor: '#6200EE',
    shadowColor: '#6200EE',
    shadowOpacity: 0.24,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
    marginBottom: 18,
  },
  rotuloSaldo: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.2,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
  },
  valorSaldo: {
    fontSize: 42,
    lineHeight: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  seloSaldo: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textoSelo: {
    fontSize: 10,
    lineHeight: 12,
    color: '#FFFFFF',
  },
  cabecalhoResumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  tituloResumo: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    color: '#202020',
  },
  mesResumo: {
    fontSize: 11,
    lineHeight: 14,
    color: '#737373',
  },
  cartaoResumo: {
    borderRadius: 22,
    backgroundColor: '#F1F1F4',
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 14,
    marginBottom: 16,
  },
  legendaResumo: {
    fontSize: 11,
    lineHeight: 14,
    color: '#71717A',
    marginBottom: 6,
  },
  valorResumo: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    color: '#202020',
    marginBottom: 14,
  },
  listaCategorias: {
    gap: 10,
  },
  itemCategoria: {
    gap: 6,
  },
  linhaCategoria: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pontoCategoria: {
    width: 6,
    height: 6,
    borderRadius: 999,
    marginRight: 8,
  },
  nomeCategoria: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    color: '#202020',
  },
  valorCategoria: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: '#202020',
  },
  trilhaCategoria: {
    height: 4,
    borderRadius: 999,
    backgroundColor: '#D4D4D8',
    overflow: 'hidden',
  },
  preenchimentoCategoria: {
    height: '100%',
    borderRadius: 999,
  },
  gradeCartoes: {
    gap: 12,
    marginBottom: 18,
  },
  cartaoInformacao: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#111827',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  iconeInformacao: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconeEmoji: {
    fontSize: 14,
  },
  rotuloInformacao: {
    fontSize: 10,
    lineHeight: 12,
    color: '#A1A1AA',
    marginBottom: 4,
  },
  valorInformacao: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '700',
    color: '#202020',
  },
  linkExtrato: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
    color: '#6200EE',
    marginBottom: 8,
  },
});
