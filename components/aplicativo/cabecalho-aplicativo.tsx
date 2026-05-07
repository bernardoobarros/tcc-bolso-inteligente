import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useMenuAplicativo } from '@/components/aplicativo/tela-aplicativo';

type PropriedadesCabecalhoAplicativo = {
  titulo?: string;
  subtitulo?: string;
  tituloCentralizado?: boolean;
};

export function CabecalhoAplicativo({
  titulo,
  subtitulo,
  tituloCentralizado = false,
}: PropriedadesCabecalhoAplicativo) {
  const { abrirMenu } = useMenuAplicativo();

  return (
    <View style={estilos.container}>
      <View style={estilos.ladoEsquerdo}>
        <Pressable hitSlop={8} onPress={abrirMenu} style={estilos.botaoIcone}>
          <Ionicons color="#6200EE" name="menu" size={18} />
        </Pressable>
        {tituloCentralizado ? null : (
          <Text style={estilos.marca}>Bolso Inteligente</Text>
        )}
      </View>

      {tituloCentralizado && titulo ? (
        <View pointerEvents="none" style={estilos.areaTituloCentralizado}>
          <Text style={estilos.tituloCentralizado}>{titulo}</Text>
        </View>
      ) : null}

      <View style={estilos.ladoDireito}>
        {subtitulo ? <Text style={estilos.subtitulo}>{subtitulo}</Text> : null}
        {!tituloCentralizado ? (
          <Pressable style={estilos.botaoIcone}>
            <Ionicons color="#111827" name="notifications-outline" size={18} />
          </Pressable>
        ) : null}
        <View style={estilos.avatar}>
          <Ionicons color="#F6C8A6" name="person" size={15} />
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  ladoEsquerdo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 1,
  },
  ladoDireito: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 1,
  },
  botaoIcone: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaTituloCentralizado: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marca: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: '#111827',
  },
  tituloCentralizado: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: '#6200EE',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#9CA3AF',
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
});
