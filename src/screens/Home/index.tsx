import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import { useState } from "react";

export function Home() {
  const [participantName, setParticipantName] = useState<string>("");
  const [participants, setParticipants] = useState<string[]>([
    "Jhon",
    "Doe",
    "Zec",
    "Jhow",
    "John 1",
    "John 2",
    "Mike",
    "John 3",
  ]);

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert(
        `Participante ${participantName} Existe`,
        "Já existe um participante na lista com este nome."
      );
    } else {
      participants.push(participantName);
      return Alert.alert(
        `Participante ${participantName} Adicionado`,
        "Participante adicionado com sucesso!"
      );
    }
  }
  function handleParticipantRemove(name: string) {
    return Alert.alert(
      `Remover`,
      `Remover o participante ${name}?`,
      [
        {
          text: "OK",
          onPress: () => {
            participants.splice(participants.indexOf(name), 1);
          },
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>
      <Text style={styles.eventDate}> Domingos, 30 de Abril de 2023</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={(name) => setParticipantName(name)}
        />
        <TouchableOpacity onPress={handleParticipantAdd} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant name={item} onRemove={handleParticipantRemove} />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Nenhum participante cadastrado! Adcione participantes a sua lista de
            presença.
          </Text>
        )}
      />
    </View>
  );
}
