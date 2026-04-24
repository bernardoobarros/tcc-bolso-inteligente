import { type Href, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  BlocoTitulo,
  BotaoPrimario,
  BotaoSocial,
  CabecalhoMarca,
  CampoAutenticacao,
  Divisor,
  EstruturaAutenticacao,
} from "@/components/autenticacao/interface";

export default function TelaEntrar() {
  const rotaDashboard = "/dashboard" as Href;

  return (
    <EstruturaAutenticacao>
      <CabecalhoMarca exibirAjuda />

      <BlocoTitulo
        titulo="Entrar"
        subtitulo="Acesse sua conta para continuar"
      />

      <View style={estilos.gradeSocial}>
        <BotaoSocial nomeIcone="logo-google" rotulo="Google" />
        <BotaoSocial nomeIcone="logo-apple" rotulo="Apple" />
      </View>

      <View style={estilos.espacamentoDivisor}>
        <Divisor rotulo="OU" />
      </View>

      <View style={estilos.formulario}>
        <CampoAutenticacao
          autoCapitalize="none"
          keyboardType="email-address"
          rotulo="EMAIL"
          placeholder="nome@exemplo.com"
        />
        <CampoAutenticacao
          rotulo="SENHA"
          placeholder="••••••••"
          secureTextEntry
          exibirAlternanciaSenha
        />
      </View>

      <Pressable style={estilos.linkEsqueciSenha}>
        <Text style={estilos.textoEsqueciSenha}>Esqueci minha senha</Text>
      </Pressable>

      <View style={estilos.areaInferior}>
        <BotaoPrimario
          rotulo="Entrar"
          onPress={() => router.replace(rotaDashboard)}
        />

        <Pressable
          onPress={() => router.push("/cadastro")}
          style={estilos.linkRodape}
        >
          <Text style={estilos.textoRodape}>
            Não tem uma conta?{" "}
            <Text style={estilos.textoRodapeDestaque}>Criar agora</Text>
          </Text>
        </Pressable>
      </View>
    </EstruturaAutenticacao>
  );
}

const estilos = StyleSheet.create({
  gradeSocial: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 32,
  },
  espacamentoDivisor: {
    marginBottom: 32,
  },
  formulario: {
    gap: 24,
  },
  linkEsqueciSenha: {
    alignSelf: "flex-end",
    marginTop: 16,
  },
  textoEsqueciSenha: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: "#4800B2",
    textDecorationLine: "underline",
    textDecorationColor: "rgba(72,0,178,0.3)",
  },
  areaInferior: {
    gap: 24,
    paddingTop: 40,
  },
  linkRodape: {
    alignItems: "center",
  },
  textoRodape: {
    fontSize: 14,
    lineHeight: 20,
    color: "#494456",
    textAlign: "center",
  },
  textoRodapeDestaque: {
    fontWeight: "600",
    color: "#4800B2",
  },
});
