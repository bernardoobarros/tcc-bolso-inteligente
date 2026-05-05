import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CabecalhoAplicativo } from '@/components/aplicativo/cabecalho-aplicativo';
import { TelaAplicativo } from '@/components/aplicativo/tela-aplicativo';
import { useAplicativo } from '@/contextos/aplicativo-contexto';
import { formatarMoeda, obterDiasRestantes } from '@/utils/financeiro';

export default function TelaContasAPagar() {
  const { contasPagar, reservas, marcarContaComoPaga } = useAplicativo();
  const totalReservas = reservas.reduce((total, reserva) => total + reserva.valorAtual, 0);

  return (
    <TelaAplicativo abaAtiva="dashboard">
      <CabecalhoAplicativo />

      <Text style={estilos.titulo}>Contas a pagar</Text>
      <Text style={estilos.subtitulo}>{contasPagar.length} pendentes</Text>

      <View style={estilos.listaContas}>
        {contasPagar.map((conta) => {
          const diasRestantes = obterDiasRestantes(conta.vencimento);
          const status =
            diasRestantes < 0 ? 'VENCIDO' : diasRestantes <= 2 ? 'URGENTE' : '';
          const detalhe =
            diasRestantes < 0
              ? `Atraso de ${Math.abs(diasRestantes)} dia${Math.abs(diasRestantes) === 1 ? '' : 's'}`
              : `Vence em ${diasRestantes} dia${diasRestantes === 1 ? '' : 's'}`;

          return (
            <View key={conta.id} style={estilos.cartaoConta}>
              <View style={estilos.linhaSuperior}>
                <View style={estilos.iconeConta}>
                  <Ionicons color="#71717A" name="receipt-outline" size={18} />
                </View>
                <View style={estilos.areaTitulo}>
                  <Text style={estilos.nomeConta}>{conta.titulo}</Text>
                  {status ? (
                    <Text
                      style={[
                        estilos.statusConta,
                        { color: status === 'URGENTE' ? '#DC2626' : '#EA580C' },
                      ]}>
                      {status}
                    </Text>
                  ) : null}
                </View>
              </View>

              <Text style={estilos.detalheConta}>{detalhe}</Text>
              <Text style={estilos.valorConta}>{formatarMoeda(conta.valor)}</Text>

              <Pressable onPress={() => marcarContaComoPaga(conta.id)} style={estilos.botaoPagar}>
                <Text style={estilos.textoBotaoPagar}>
                  {diasRestantes < 0 ? 'Pagar Agora' : 'Pagar'}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>

      {contasPagar.length === 0 ? (
        <View style={estilos.estadoVazio}>
          <Ionicons color="#6200EE" name="checkmark-circle-outline" size={18} />
          <Text style={estilos.textoEstadoVazio}>Nenhuma conta pendente no momento.</Text>
        </View>
      ) : null}

      <View style={estilos.cartaoReserva}>
        <View style={estilos.iconeReserva}>
          <Ionicons color="#6200EE" name="shield-checkmark-outline" size={16} />
        </View>
        <View>
          <Text style={estilos.rotuloReserva}>RESERVAS</Text>
          <Text style={estilos.valorReserva}>{formatarMoeda(totalReservas)}</Text>
        </View>
      </View>
    </TelaAplicativo>
  );
}

const estilos = StyleSheet.create({
  titulo: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
    color: '#202020',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 15,
    lineHeight: 19,
    color: '#71717A',
    marginBottom: 20,
  },
  listaContas: {
    gap: 14,
    marginBottom: 18,
  },
  cartaoConta: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: 16,
    shadowColor: '#111827',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  linhaSuperior: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconeConta: {
    width: 38,
    height: 38,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  areaTitulo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  nomeConta: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    color: '#202020',
  },
  statusConta: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '700',
  },
  detalheConta: {
    fontSize: 13,
    lineHeight: 17,
    color: '#71717A',
    marginBottom: 6,
  },
  valorConta: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
    color: '#202020',
    marginBottom: 14,
  },
  botaoPagar: {
    height: 44,
    borderRadius: 999,
    backgroundColor: '#6200EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotaoPagar: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  estadoVazio: {
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: '#F5EEFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 18,
  },
  textoEstadoVazio: {
    fontSize: 13,
    lineHeight: 17,
    color: '#6200EE',
    fontWeight: '600',
  },
  cartaoReserva: {
    borderRadius: 20,
    backgroundColor: '#F5EEFF',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  iconeReserva: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rotuloReserva: {
    fontSize: 10,
    lineHeight: 12,
    color: '#A1A1AA',
    marginBottom: 4,
  },
  valorReserva: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '700',
    color: '#202020',
  },
});
