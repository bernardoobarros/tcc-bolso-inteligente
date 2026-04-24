import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from 'react-native';

type PropriedadesEstruturaAutenticacao = {
  children: ReactNode;
};

export function EstruturaAutenticacao({ children }: PropriedadesEstruturaAutenticacao) {
  return (
    <SafeAreaView style={estilos.areaSegura}>
      <View style={estilos.brilhoSuperior} />
      <View style={estilos.brilhoInferior} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
        style={estilos.containerTeclado}>
        <ScrollView
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={estilos.conteudoRolagem}
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

type PropriedadesCabecalhoMarca = {
  exibirAjuda?: boolean;
};

export function CabecalhoMarca({ exibirAjuda = false }: PropriedadesCabecalhoMarca) {
  return (
    <View style={estilos.cabecalhoMarca}>
      <Text style={estilos.textoMarca}>Bolso Inteligente</Text>
      {exibirAjuda ? (
        <View style={estilos.botaoAjuda}>
          <Ionicons color="#494456" name="help-circle-outline" size={16} />
        </View>
      ) : null}
    </View>
  );
}

type PropriedadesBlocoTitulo = {
  titulo: string;
  subtitulo: string;
};

export function BlocoTitulo({ titulo, subtitulo }: PropriedadesBlocoTitulo) {
  return (
    <View style={estilos.blocoTitulo}>
      <Text style={estilos.titulo}>{titulo}</Text>
      <Text style={estilos.subtitulo}>{subtitulo}</Text>
    </View>
  );
}

type PropriedadesBotaoSocial = {
  nomeIcone: keyof typeof Ionicons.glyphMap;
  rotulo: string;
  arredondado?: boolean;
};

export function BotaoSocial({
  nomeIcone,
  rotulo,
  arredondado = false,
}: PropriedadesBotaoSocial) {
  return (
    <Pressable style={[estilos.botaoSocial, arredondado && estilos.botaoSocialArredondado]}>
      <Ionicons color="#1A1C1D" name={nomeIcone} size={18} />
      <Text
        style={[
          estilos.textoBotaoSocial,
          arredondado && estilos.textoBotaoSocialArredondado,
        ]}>
        {rotulo}
      </Text>
    </Pressable>
  );
}

type PropriedadesCampoAutenticacao = TextInputProps & {
  rotulo: string;
  exibirAlternanciaSenha?: boolean;
};

export function CampoAutenticacao({
  rotulo,
  exibirAlternanciaSenha = false,
  style,
  ...propriedades
}: PropriedadesCampoAutenticacao) {
  return (
    <View style={estilos.blocoCampo}>
      <Text style={estilos.rotuloCampo}>{rotulo}</Text>
      <View style={estilos.containerCampo}>
        <TextInput
          placeholderTextColor="rgba(73,68,86,0.5)"
          style={[estilos.campoTexto, style]}
          {...propriedades}
        />
        {exibirAlternanciaSenha ? (
          <Ionicons color="#8C8896" name="eye-outline" size={22} />
        ) : null}
      </View>
    </View>
  );
}

type PropriedadesBotaoPrimario = {
  rotulo: string;
  onPress?: () => void;
};

export function BotaoPrimario({ rotulo, onPress }: PropriedadesBotaoPrimario) {
  return (
    <Pressable onPress={onPress} style={estilos.botaoPrimario}>
      <Text style={estilos.textoBotaoPrimario}>{rotulo}</Text>
      <Ionicons color="#FFFFFF" name="arrow-forward" size={16} />
    </Pressable>
  );
}

type PropriedadesDivisor = {
  rotulo: string;
};

export function Divisor({ rotulo }: PropriedadesDivisor) {
  return (
    <View style={estilos.linhaDivisoria}>
      <View style={estilos.tracoDivisorio} />
      <Text style={estilos.rotuloDivisorio}>{rotulo}</Text>
      <View style={estilos.tracoDivisorio} />
    </View>
  );
}

const estilos = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  containerTeclado: {
    flex: 1,
  },
  brilhoSuperior: {
    position: 'absolute',
    top: -96,
    right: -96,
    width: 320,
    height: 320,
    borderRadius: 999,
    backgroundColor: 'rgba(103,77,174,0.05)',
  },
  brilhoInferior: {
    position: 'absolute',
    bottom: -81,
    left: -96,
    width: 256,
    height: 256,
    borderRadius: 999,
    backgroundColor: 'rgba(72,0,178,0.05)',
  },
  conteudoRolagem: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 28,
  },
  cabecalhoMarca: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  textoMarca: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
    color: '#1A1C1D',
  },
  botaoAjuda: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8EA',
  },
  blocoTitulo: {
    gap: 8,
    marginBottom: 32,
  },
  titulo: {
    fontSize: 28,
    lineHeight: 35,
    fontWeight: '800',
    color: '#1A1C1D',
  },
  subtitulo: {
    fontSize: 16,
    lineHeight: 24,
    color: '#494456',
  },
  botaoSocial: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#1A1C1D',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  botaoSocialArredondado: {
    height: 48,
    borderRadius: 999,
    backgroundColor: '#F3F3F5',
    shadowOpacity: 0,
    elevation: 0,
  },
  textoBotaoSocial: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: '#1A1C1D',
  },
  textoBotaoSocialArredondado: {
    fontSize: 16,
    lineHeight: 24,
  },
  blocoCampo: {
    gap: 8,
  },
  rotuloCampo: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: '#494456',
  },
  containerCampo: {
    height: 56,
    borderRadius: 12,
    backgroundColor: '#E8E8EA',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 12,
  },
  campoTexto: {
    flex: 1,
    fontSize: 16,
    color: '#1A1C1D',
  },
  botaoPrimario: {
    height: 56,
    borderRadius: 999,
    backgroundColor: '#6200EE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#4800B2',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  textoBotaoPrimario: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  linhaDivisoria: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  tracoDivisorio: {
    flex: 1,
    height: 1,
    backgroundColor: '#CBC3D9',
    opacity: 0.15,
  },
  rotuloDivisorio: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    color: '#494456',
    letterSpacing: 0.6,
  },
});
