import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

import { TelaAplicativo } from "@/components/aplicativo/tela-aplicativo";

export default function TelaPerfil() {
  return (
    <TelaAplicativo abaAtiva="perfil" rolavel={false}>
      <View style={estilos.cabecalho}>
        <Pressable style={estilos.botaoTopo}>
          <Ionicons color="#6200EE" name="menu" size={18} />
        </Pressable>
        <Text style={estilos.tituloCabecalho}>PERFIL</Text>
        <Pressable style={estilos.botaoTopo}>
          <Ionicons color="#6200EE" name="settings-outline" size={18} />
        </Pressable>
      </View>

      <View style={estilos.container}>
        <View style={estilos.blocoUsuario}>
          <View style={estilos.avatar}>
            <View style={estilos.botaoLapis}>
              <Ionicons color="#FFFFFF" name="pencil" size={10} />
            </View>
          </View>
          <Text style={estilos.nome}>Bernardo Barros</Text>
          <Text style={estilos.email}>exemplo@email.com</Text>
        </View>

        <Text style={estilos.rotuloSecao}>CONFIGURAÇÕES DE CONTA</Text>
        <View style={estilos.cartaoSecao}>
          <ItemPerfil icone="person-outline" titulo="Informações Pessoais" />
          <ItemPerfil icone="shield-checkmark-outline" titulo="Segurança" />
          <ItemPerfil icone="notifications-outline" titulo="Notificações" />
        </View>

        <Text style={estilos.rotuloSecao}>PREFERÊNCIAS DO APP</Text>
        <View style={estilos.cartaoSecao}>
          <ItemPerfil
            destaqueDireita="Português (BR)"
            icone="globe-outline"
            titulo="Idioma"
          />
          <ItemSwitch titulo="Modo Escuro" />
          <ItemPerfil icone="color-palette-outline" titulo="Aparência" />
        </View>

        <Text style={estilos.rotuloSecao}>SUPORTE</Text>
        <View style={estilos.linhaSuporte}>
          <CartaoSuporte icone="help-circle-outline" titulo="AJUDA" />
          <CartaoSuporte icone="mail-outline" titulo="CONTATO" />
        </View>

        <Pressable style={estilos.botaoTermos}>
          <View style={estilos.iconeTermos}>
            <Ionicons color="#6200EE" name="document-text-outline" size={16} />
          </View>
          <Text style={estilos.textoTermos}>TERMOS E PRIVACIDADE</Text>
          <Ionicons color="#A1A1AA" name="open-outline" size={14} />
        </Pressable>

        <Pressable style={estilos.botaoSair}>
          <Ionicons color="#DC2626" name="log-out-outline" size={16} />
          <Text style={estilos.textoSair}>Sair da Conta</Text>
        </Pressable>
      </View>
    </TelaAplicativo>
  );
}

type PropriedadesItemPerfil = {
  icone: keyof typeof Ionicons.glyphMap;
  titulo: string;
  destaqueDireita?: string;
};

function ItemPerfil({
  icone,
  titulo,
  destaqueDireita,
}: PropriedadesItemPerfil) {
  return (
    <Pressable style={estilos.itemLinha}>
      <View style={estilos.areaLinhaEsquerda}>
        <View style={estilos.iconeLinha}>
          <Ionicons color="#6200EE" name={icone} size={16} />
        </View>
        <Text style={estilos.tituloLinha}>{titulo}</Text>
      </View>
      <View style={estilos.areaLinhaDireita}>
        {destaqueDireita ? (
          <Text style={estilos.textoDestaqueDireita}>{destaqueDireita}</Text>
        ) : null}
        <Ionicons color="#D4D4D8" name="chevron-forward" size={16} />
      </View>
    </Pressable>
  );
}

function ItemSwitch({ titulo }: { titulo: string }) {
  return (
    <View style={estilos.itemLinha}>
      <View style={estilos.areaLinhaEsquerda}>
        <View style={estilos.iconeLinha}>
          <Ionicons color="#52525B" name="moon-outline" size={16} />
        </View>
        <Text style={estilos.tituloLinha}>{titulo}</Text>
      </View>
      <Switch
        ios_backgroundColor="#E5E7EB"
        thumbColor="#FFFFFF"
        trackColor={{ false: "#E5E7EB", true: "#C4B5FD" }}
        value={false}
      />
    </View>
  );
}

function CartaoSuporte({
  icone,
  titulo,
}: {
  icone: keyof typeof Ionicons.glyphMap;
  titulo: string;
}) {
  return (
    <Pressable style={estilos.cartaoSuporte}>
      <Ionicons color="#6200EE" name={icone} size={18} />
      <Text style={estilos.tituloSuporte}>{titulo}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  botaoTopo: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  tituloCabecalho: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
    color: "#202020",
  },
  container: {
    flex: 1,
  },
  blocoUsuario: {
    alignItems: "center",
    marginBottom: 18,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 999,
    backgroundColor: "#6200EE",
    marginBottom: 12,
  },
  botaoLapis: {
    position: "absolute",
    right: 0,
    bottom: 2,
    width: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: "#5B21B6",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  nome: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "800",
    color: "#202020",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    lineHeight: 18,
    color: "#71717A",
  },
  rotuloSecao: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.8,
    color: "#71717A",
    marginBottom: 10,
    marginTop: 8,
  },
  cartaoSecao: {
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: "#111827",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    marginBottom: 6,
  },
  itemLinha: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  areaLinhaEsquerda: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  areaLinhaDireita: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 8,
  },
  iconeLinha: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: "#F3E8FF",
    alignItems: "center",
    justifyContent: "center",
  },
  tituloLinha: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    color: "#202020",
  },
  textoDestaqueDireita: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: "#6200EE",
  },
  linhaSuporte: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  cartaoSuporte: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    minHeight: 64,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  tituloSuporte: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "700",
    color: "#202020",
  },
  botaoTermos: {
    minHeight: 44,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: 16,
  },
  iconeTermos: {
    width: 20,
    alignItems: "center",
  },
  textoTermos: {
    flex: 1,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "700",
    color: "#202020",
  },
  botaoSair: {
    minHeight: 50,
    borderRadius: 16,
    backgroundColor: "#FEE2E2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: "auto",
  },
  textoSair: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
    color: "#DC2626",
  },
});
