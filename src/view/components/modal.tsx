import { zodResolver } from "@hookform/resolvers/zod";
import { PawPrint, Phone, User } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Client } from "../../app/interface/client";
import { period } from "../../app/utils/period";
import { Button } from "./button";
import { Date } from "./date";
import { InputLabel } from "./inputLabel";
import { Textarea } from "./textarea";

interface ModalProps {
  onClose: () => void;
  onAddClient: (client: Client) => void;
}

const schema = z.object({
  hour: z.string(),
  dog: z.string().min(1),
  owner: z.string().min(1),
  service: z.string().min(1),
  day: z.string(),
  phone: z.string(),
});

type schemaType = z.infer<typeof schema>;

export function Modal({ onClose, onAddClient }: ModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit: onCreatingClient } = useForm<schemaType>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = onCreatingClient((data) => {
    try {
      const { dog, owner, ...rest } = data;
      const costumerInfo: Client = {
        ...rest,
        id: crypto.randomUUID(),
        client: {
          dog,
          owner,
        },
        period: period(rest.hour),
      };

      onAddClient(costumerInfo);
      onClose();
    } catch (e) {
      console.log(e);
    }
  });

  useEffect(() => {
    function hasClick(e: MouseEvent) {
      const target = e.target as Node;
      if (formRef.current && !formRef.current.contains(target)) {
        onClose();
      }
    }

    function hasPressedEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("mousedown", hasClick);
    window.addEventListener("keydown", hasPressedEscape);

    return () => {
      window.removeEventListener("mousedown", hasClick);
      window.removeEventListener("keydown", hasPressedEscape);
    };
  }, [formRef, onClose]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="flex w-[600px] flex-col rounded-lg bg-[#23242C] p-10 shadow-md"
      >
        <fieldset className="mb-7 space-y-2">
          <h2 className="text-xl font-bold">Agende um atendimento</h2>
          <p className="text-sm text-gray-400">
            Preencha os dados do cliente para realizar o agendamento:
          </p>
        </fieldset>
        <fieldset className="space-y-4">
          <InputLabel
            label="Nome do tutor"
            icon={<User className="size-5 text-[#9282FA]" />}
            placeholder="Nome do tutor"
            {...register("owner")}
            required
          />

          <InputLabel
            label="Nome do pet"
            icon={<PawPrint className="size-5 text-[#9282FA]" />}
            placeholder="Nome do pet"
            {...register("dog")}
            required
          />

          <InputLabel
            label="Telefone"
            icon={<Phone className="size-5 text-[#9282FA]" />}
            {...register("phone")}
            placeholder="(00) 0 0000-0000"
          />
          <Textarea {...register("service")} />
          <div className="grid w-full grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block">Data</label>
              <Date className="w-full" {...register("day")} />
            </div>
            <div>
              <label className="mb-2 block">Hora</label>
              <Date type="time" className="w-full" {...register("hour")} />
            </div>
          </div>
        </fieldset>
        <Button type="submit" className="ml-auto mt-7 w-fit">
          Agendar
        </Button>
      </form>
    </div>
  );
}
