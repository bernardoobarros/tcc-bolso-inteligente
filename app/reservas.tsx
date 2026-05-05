import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { TelaAplicativo } from '@/components/aplicativo/tela-aplicativo';
import { useAplicativo } from '@/contextos/aplicativo-contexto';
import { calcularPercentual, formatarMoeda } from '@/utils/financeiro';

export default function TelaReservas() {
  const { reservas } = useAplicativo();

  const totalReservas = useMemo(
    () => reservas.reduce((total, reserva) => total + reserva.valorAtual, 0),
    [reservas],
  );

  return (
    <TelaAplicativo abaAtiva="dashboard">
      <View style={estilos.cabecalho}>
        <Pressable onPress={() => router.back()} style={estilos.botaoVoltar}>
          <Ionicons color="#202020" name="arrow-back" size={20} />
        </Pressable>
        <Text style={estilos.marca}>Bolso Inteligente</Text>
        <View style={estilos.avatar}>
          <Ionicons color="#F6C8A6" name="person" size={14} />
        </View>
      </View>

      <Text style={estilos.titulo}>Reservas</Text>
      <Text style={estilos.subtitulo}>
        Acompanhe e gerencie seus objetivos financeiros.
      </Text>

      <View style={estilos.cartaoPrincipal}>
        <Text style={estilos.rotuloPrincipal}>TOTAL EM RESERVAS</Text>
        <Text style={estilos.valorPrincipal}>{formatarMoeda(totalReservas)}</Text>

        <Pressable onPress={() => router.push('/nova-reserva')} style={estilos.botaoNovaReserva}>
          <Ionicons color="#FFFFFF" name="add" size={18} />
          <Text style={estilos.textoBotaoNovaReserva}>Nova Reserva</Text>
        </Pressable>
      </View>

      <Text style={estilos.tituloSecao}>Seus Objetivos</Text>

      <View style={estilos.listaObjetivos}>
        {reservas.map((reserva) => {
          const percentual = calcularPercentual(reserva.valorAtual, reserva.valorMeta);

          return (
            <View key={reserva.id} style={estilos.cartaoObjetivo}>
              <View style={estilos.linhaObjetivo}>
                <View style={estilos.iconeObjetivo}>
                  <Ionicons color="#6200EE" name="shield-checkmark-outline" size={16} />
                </View>

                <View style={estilos.areaTextoObjetivo}>
                  <Text style={estilos.nomeObjetivo}>{reserva.titulo}</Text>
                  <Text style={estilos.categoriaObjetivo}>{reserva.categoria}</Text>
                </View>

                <View style={estilos.areaValorObjetivo}>
                  <Text style={estilos.valorObjetivo}>{formatarMoeda(reserva.valorAtual)}</Text>
                  <Text style={estilos.metaObjetivo}>de {formatarMoeda(reserva.valorMeta)}</Text>
                </View>
              </View>

              <Text style={estilos.progressoTexto}>{percentual}% Concluído</Text>
              <View style={estilos.trilhaObjetivo}>
                <View style={[estilos.preenchimentoObjetivo, { width: `${percentual}%` }]} />
              </View>
            </View>
          );
        })}
      </View>
    </TelaAplicativo>
  );
}

const estilos = StyleSheet.create({
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
  marca: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '700',
    color: '#6200EE',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: '#1F2937',
    borderWidth: 2,
    borderColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
    color: '#202020',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    lineHeight: 20,
    color: '#52525B',
    marginBottom: 22,
    maxWidth: 240,
  },
  cartaoPrincipal: {
    borderRadius: 24,
    backgroundColor: '#F7F3FF',
    padding: 18,
    shadowColor: '#111827',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    marginBottom: 24,
  },
  rotuloPrincipal: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.8,
    color: '#71717A',
    marginBottom: 10,
  },
  valorPrincipal: {
    fontSize: 42,
    lineHeight: 48,
    fontWeight: '800',
    color: '#202020',
    marginBottom: 18,
  },
  botaoNovaReserva: {
    height: 48,
    borderRadius: 999,
    backgroundColor: '#6200EE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  textoBotaoNovaReserva: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tituloSecao: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    color: '#202020',
    marginBottom: 16,
  },
  listaObjetivos: {
    gap: 14,
  },
  cartaoObjetivo: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: 16,
    shadowColor: '#111827',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  linhaObjetivo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconeObjetivo: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  areaTextoObjetivo: {
    flex: 1,
    marginRight: 10,
  },
  nomeObjetivo: {
    fontSize: 19,
    lineHeight: 22,
    fontWeight: '700',
    color: '#202020',
    marginBottom: 4,
  },
  categoriaObjetivo: {
    fontSize: 13,
    lineHeight: 17,
    color: '#71717A',
  },
  areaValorObjetivo: {
    alignItems: 'flex-end',
    maxWidth: 120,
  },
  valorObjetivo: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '700',
    color: '#202020',
    textAlign: 'right',
  },
  metaObjetivo: {
    fontSize: 12,
    lineHeight: 16,
    color: '#71717A',
    textAlign: 'right',
  },
  progressoTexto: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: '#6200EE',
    marginBottom: 8,
  },
  trilhaObjetivo: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  preenchimentoObjetivo: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#6200EE',
  },
});
