import { format, formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { Client } from "./app/interface/client";
import { Button } from "./view/components/button";
import { Card } from "./view/components/card";
import { Date as DateComponent } from "./view/components/date";
import { Header } from "./view/components/header";
import { Main } from "./view/components/main";
import { Modal } from "./view/components/modal";

function App() {
  const [dateInput, setDateInput] = useState(format(new Date(), "yyyy-MM-dd"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>(() => {
    const simplePets = localStorage.getItem("@simplepets");
    if (simplePets) {
      return JSON.parse(simplePets);
    } else {
      return [];
    }
  });
  const filteredByDay = clients.filter((client) => client.day === dateInput);

  const morningClients = filteredByDay.filter(
    (client) => client.period === "morning",
  );
  const afternoonClients = filteredByDay.filter(
    (client) => client.period === "afternoon",
  );
  const eveningClients = filteredByDay.filter(
    (client) => client.period === "evening",
  );

  const handleAddClient = (newClient: Client) => {
    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    localStorage.setItem("@simplepets", JSON.stringify(updatedClients));
  };

  const handleDeleteClient = (id: string) => {
    const filteredId = clients.filter((client) => client.id !== id);
    setClients(filteredId);
    localStorage.setItem("@simplepets", JSON.stringify(filteredId));
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#151515] text-white antialiased">
      <Header />
      <Main>
        <header className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold leading-relaxed text-white">
              Sua agenda
            </h2>
            <p className="hidden text-gray-500 md:block">
              Aqui você pode ver todos os clientes e serviços agendados para{" "}
              {formatDistance(dateInput, new Date(), {
                locale: ptBR,
                addSuffix: true,
              })}
            </p>
          </div>
          <DateComponent
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
        </header>
        <Card
          period="Manhã"
          clients={morningClients}
          onDelete={handleDeleteClient}
        />
        <Card
          period="Tarde"
          clients={afternoonClients}
          onDelete={handleDeleteClient}
        />
        <Card
          period="Noite"
          clients={eveningClients}
          onDelete={handleDeleteClient}
        />
        <div className="mx-auto w-full max-w-[710px]">
          <Button className="w-full" onClick={handleOpenModal}>
            Novo agendamento
          </Button>
        </div>
      </Main>

      {isModalOpen && (
        <Modal onAddClient={handleAddClient} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
