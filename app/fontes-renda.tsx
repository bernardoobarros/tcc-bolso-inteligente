import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CabecalhoAplicativo } from '@/components/aplicativo/cabecalho-aplicativo';
import { TelaAplicativo } from '@/components/aplicativo/tela-aplicativo';
import { useAplicativo } from '@/contextos/aplicativo-contexto';
import { formatarMoeda } from '@/utils/financeiro';

export default function TelaFontesRenda() {
  const { rendas } = useAplicativo();

  const totalMensal = useMemo(
    () => rendas.reduce((total, renda) => total + renda.valorMensal, 0),
    [rendas],
  );
  const totalPrincipal = useMemo(
    () =>
      rendas
        .filter((renda) => renda.tipoFonte === 'principal')
        .reduce((total, renda) => total + renda.valorMensal, 0),
    [rendas],
  );
  const totalExtra = totalMensal - totalPrincipal;
  const percentualPrincipal = totalMensal > 0 ? Math.round((totalPrincipal / totalMensal) * 100) : 0;
  const totalMensalExibido = formatarMoeda(totalMensal).replace('R$', '').trim();

  return (
    <TelaAplicativo abaAtiva="dashboard">
      <CabecalhoAplicativo />

      <Text style={estilos.rotuloTopo}>TOTAL MENSAL PREVISTO</Text>
      <View style={estilos.linhaTotal}>
        <Text style={estilos.moeda}>R$</Text>
        <Text style={estilos.valorTotal}>{totalMensalExibido}</Text>
      </View>

      <View style={estilos.seloResumo}>
        <Text style={estilos.textoSelo}>+12 % em relação ao mês anterior</Text>
      </View>

      <View style={estilos.cartoesResumo}>
        <View style={estilos.cartaoPrincipal}>
          <Text style={estilos.tituloCartaoClaro}>Renda Principal</Text>
          <Text style={estilos.textoCartaoClaro}>
            Representa {percentualPrincipal}% da sua receita mensal consolidada.
          </Text>
          <Text style={estilos.valorCartaoClaro}>{formatarMoeda(totalPrincipal)}</Text>
          <Pressable style={estilos.botaoGrafico}>
            <Text style={estilos.textoBotaoGrafico}>Ver Gráfico</Text>
          </Pressable>
        </View>

        <View style={estilos.cartaoRoxo}>
          <Ionicons color="#FFFFFF" name="sparkles-outline" size={18} />
          <Text style={estilos.tituloCartaoRoxo}>Renda Extra</Text>
          <Text style={estilos.textoMeta}>META: R$ 5.000</Text>
          <Text style={estilos.valorCartaoRoxo}>{formatarMoeda(totalExtra)}</Text>
          <View style={estilos.trilhaMeta}>
            <View
              style={[
                estilos.preenchimentoMeta,
                { width: `${Math.min(100, Math.round((totalExtra / 5000) * 100))}%` },
              ]}
            />
          </View>
        </View>
      </View>

      <View style={estilos.cabecalhoLista}>
        <Text style={estilos.tituloLista}>Minhas Fontes</Text>
        <Pressable style={estilos.botaoFiltro}>
          <Ionicons color="#6200EE" name="funnel-outline" size={14} />
          <Text style={estilos.textoFiltro}>Filtrar</Text>
        </Pressable>
      </View>

      <View style={estilos.listaFontes}>
        {rendas.map((renda) => (
          <View key={renda.id} style={estilos.cartaoFonte}>
            <View style={estilos.iconeFonte}>
              <Ionicons color="#6200EE" name="wallet-outline" size={16} />
            </View>

            <View style={estilos.areaTextoFonte}>
              <Text style={estilos.tituloFonte}>{renda.descricao}</Text>
              <View style={estilos.linhaMetaFonte}>
                <View
                  style={[
                    estilos.seloTipoFonte,
                    renda.tipoFonte === 'principal'
                      ? estilos.seloPrincipal
                      : estilos.seloExtra,
                  ]}>
                  <Text style={estilos.textoSeloFonte}>
                    {renda.tipoFonte === 'principal' ? 'PRINCIPAL' : 'EXTRA'}
                  </Text>
                </View>
                <Text style={estilos.categoriaFonte}>{renda.categoria}</Text>
              </View>
            </View>

            <View style={estilos.areaValorFonte}>
              <Text style={estilos.valorFonte}>{formatarMoeda(renda.valorMensal)}</Text>
              <Text style={estilos.statusFonte}>
                {renda.tipoFonte === 'principal' ? 'Próximo 05' : 'Estimado'}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={estilos.rodapeInformativo}>
        <Ionicons color="#9CA3AF" name="wallet-outline" size={16} />
        <Text style={estilos.textoRodape}>
          Planeje novas entradas de capital e adicione previsões extras ou rendimentos.
        </Text>
      </View>
    </TelaAplicativo>
  );
}

const estilos = StyleSheet.create({
  rotuloTopo: {
    fontSize: 9,
    lineHeight: 12,
    letterSpacing: 1,
    color: '#71717A',
    marginBottom: 8,
  },
  linhaTotal: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 12,
  },
  moeda: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    color: '#6200EE',
  },
  valorTotal: {
    fontSize: 52,
    lineHeight: 58,
    fontWeight: '800',
    color: '#202020',
  },
  seloResumo: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#EFE7FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 18,
  },
  textoSelo: {
    fontSize: 11,
    lineHeight: 14,
    color: '#6200EE',
    fontWeight: '600',
  },
  cartoesResumo: {
    gap: 12,
    marginBottom: 20,
  },
  cartaoPrincipal: {
    borderRadius: 20,
    backgroundColor: '#EFE7FF',
    padding: 16,
  },
  tituloCartaoClaro: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    color: '#202020',
    marginBottom: 6,
  },
  textoCartaoClaro: {
    fontSize: 12,
    lineHeight: 16,
    color: '#52525B',
    marginBottom: 10,
    maxWidth: 220,
  },
  valorCartaoClaro: {
    fontSize: 40,
    lineHeight: 46,
    fontWeight: '800',
    color: '#202020',
    marginBottom: 12,
  },
  botaoGrafico: {
    alignSelf: 'flex-end',
    borderRadius: 999,
    backgroundColor: '#6200EE',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  textoBotaoGrafico: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cartaoRoxo: {
    borderRadius: 20,
    backgroundColor: '#6200EE',
    padding: 16,
  },
  tituloCartaoRoxo: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 4,
  },
  textoMeta: {
    fontSize: 11,
    lineHeight: 14,
    color: 'rgba(255,255,255,0.72)',
    marginBottom: 8,
  },
  valorCartaoRoxo: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  trilhaMeta: {
    height: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.22)',
    overflow: 'hidden',
  },
  preenchimentoMeta: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
  cabecalhoLista: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  tituloLista: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800',
    color: '#202020',
  },
  botaoFiltro: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  textoFiltro: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#6200EE',
  },
  listaFontes: {
    gap: 12,
    marginBottom: 20,
  },
  cartaoFonte: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#111827',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  iconeFonte: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  areaTextoFonte: {
    flex: 1,
    marginRight: 10,
  },
  tituloFonte: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    color: '#202020',
    marginBottom: 6,
  },
  linhaMetaFonte: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  seloTipoFonte: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  seloPrincipal: {
    backgroundColor: '#EDE9FE',
  },
  seloExtra: {
    backgroundColor: '#FEF3C7',
  },
  textoSeloFonte: {
    fontSize: 9,
    lineHeight: 12,
    fontWeight: '700',
    color: '#6200EE',
  },
  categoriaFonte: {
    fontSize: 11,
    lineHeight: 14,
    color: '#71717A',
  },
  areaValorFonte: {
    alignItems: 'flex-end',
    maxWidth: 110,
  },
  valorFonte: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '800',
    color: '#202020',
    textAlign: 'right',
  },
  statusFonte: {
    fontSize: 10,
    lineHeight: 13,
    color: '#71717A',
    marginTop: 4,
  },
  rodapeInformativo: {
    minHeight: 84,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  textoRodape: {
    fontSize: 12,
    lineHeight: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
