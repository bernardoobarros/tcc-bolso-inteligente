import { Ionicons } from "@expo/vector-icons";
import { type Href, router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  BlocoTitulo,
  BotaoPrimario,
  BotaoSocial,
  CampoAutenticacao,
  Divisor,
  EstruturaAutenticacao,
} from "@/components/autenticacao/interface";

export default function TelaCadastro() {
  const [termosAceitos, setTermosAceitos] = useState(false);
  const rotaDashboard = "/dashboard" as Href;

  return (
    <EstruturaAutenticacao>
      <BlocoTitulo
        titulo="Criar conta"
        subtitulo="Comece sua jornada financeira"
      />

      <View style={estilos.formulario}>
        <CampoAutenticacao rotulo="Nome completo" placeholder="Seu nome aqui" />
        <CampoAutenticacao
          autoCapitalize="none"
          keyboardType="email-address"
          rotulo="Email"
          placeholder="seu@email.com"
        />
        <CampoAutenticacao
          rotulo="Senha"
          placeholder="********"
          secureTextEntry
          exibirAlternanciaSenha
        />

        <Pressable
          onPress={() => setTermosAceitos((valorAtual) => !valorAtual)}
          style={estilos.linhaTermos}
        >
          <View
            style={[
              estilos.caixaMarcacao,
              termosAceitos && estilos.caixaMarcacaoAtiva,
            ]}
          >
            {termosAceitos ? (
              <Ionicons color="#FFFFFF" name="checkmark" size={14} />
            ) : null}
          </View>
          <Text style={estilos.textoTermos}>
            Li e aceito os{" "}
            <Text style={estilos.textoTermosDestaque}>Termos de Uso</Text> e{" "}
            <Text style={estilos.textoTermosDestaque}>
              Política de Privacidade
            </Text>
          </Text>
        </Pressable>

        <BotaoPrimario
          rotulo="Criar a conta"
          onPress={() => router.replace(rotaDashboard)}
        />

        <View style={estilos.espacamentoDivisor}>
          <Divisor rotulo="OU CONTINUE COM" />
        </View>

        <View style={estilos.gradeSocial}>
          <BotaoSocial nomeIcone="logo-google" rotulo="Google" arredondado />
          <BotaoSocial nomeIcone="logo-apple" rotulo="Apple" arredondado />
        </View>
      </View>

      <Pressable
        onPress={() => router.push("/entrar")}
        style={estilos.linkRodape}
      >
        <Text style={estilos.textoRodape}>
          Já tenho conta?{" "}
          <Text style={estilos.textoRodapeDestaque}>Entrar</Text>
        </Text>
      </Pressable>
    </EstruturaAutenticacao>
  );
}

const estilos = StyleSheet.create({
  formulario: {
    gap: 24,
  },
  linhaTermos: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingTop: 8,
  },
  caixaMarcacao: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#CBC3D9",
    backgroundColor: "#FFFFFF",
    marginTop: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  caixaMarcacaoAtiva: {
    backgroundColor: "#6200EE",
    borderColor: "#6200EE",
  },
  textoTermos: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: "#494456",
  },
  textoTermosDestaque: {
    fontWeight: "600",
    color: "#4800B2",
  },
  espacamentoDivisor: {
    paddingVertical: 16,
  },
  gradeSocial: {
    flexDirection: "row",
    gap: 16,
  },
  linkRodape: {
    alignItems: "center",
    paddingTop: 32,
  },
  textoRodape: {
    fontSize: 16,
    lineHeight: 24,
    color: "#494456",
    textAlign: "center",
  },
  textoRodapeDestaque: {
    fontWeight: "700",
    color: "#4800B2",
  },
});
