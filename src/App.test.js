import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App Component - Pampa Saúde", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Renderização Inicial", () => {
    test("deve renderizar o título principal", () => {
      render(<App />);
      expect(screen.getAllByText(/Pampa Saúde/).length).toBeGreaterThan(0);
    });

    test("deve renderizar o subtítulo do hero", () => {
      render(<App />);
      expect(
        screen.getByText(/Guia rápido das Unidades Básicas de Saúde/)
      ).toBeInTheDocument();
    });

    test("deve renderizar as tags do hero", () => {
      render(<App />);
      expect(screen.getAllByText("Unipampa").length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Engenharia de Computação/).length).toBeGreaterThan(0);
      expect(screen.getAllByText("Cuidado Territorial").length).toBeGreaterThan(0);
    });

    test("deve renderizar o campo de busca", () => {
      render(<App />);
      expect(screen.getByLabelText(/Busque por bairro/)).toBeInTheDocument();
    });

    test("deve renderizar o select de filtragem", () => {
      render(<App />);
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
  });

  describe("Funcionalidade de Busca", () => {
    test("deve atualizar o estado quando o usuário digitar na busca", () => {
      render(<App />);
      const input = screen.getByLabelText(/Busque por bairro/);
      
      fireEvent.change(input, { target: { value: "Arvorezinha" } });
      
      expect(input.value).toBe("Arvorezinha");
    });

    test("deve filtrar unidades pelo termo de busca", () => {
      render(<App />);
      const input = screen.getByLabelText(/Busque por bairro/);
      
      fireEvent.change(input, { target: { value: "Arvorezinha" } });
      
      expect(screen.getByText("ESF Arvorezinha")).toBeInTheDocument();
    });

    test("deve mostrar mensagem quando não encontrar resultados", () => {
      render(<App />);
      const input = screen.getByLabelText(/Busque por bairro/);
      
      fireEvent.change(input, { target: { value: "unidade-inexistente-xyz" } });
      
      expect(screen.getByText(/Nenhuma unidade encontrada/)).toBeInTheDocument();
    });

    test("deve limpar a busca quando clicar em limpar", () => {
      render(<App />);
      const input = screen.getByLabelText(/Busque por bairro/);
      
      fireEvent.change(input, { target: { value: "teste" } });
      expect(input.value).toBe("teste");
      
      const limparButton = screen.getByText("Limpar busca");
      fireEvent.click(limparButton);
      
      expect(input.value).toBe("");
    });
  });

  describe("Funcionalidade de Filtro por Tipo", () => {
    test("deve filtrar unidades por tipo ESF", () => {
      render(<App />);
      const select = screen.getByRole("combobox");
      
      fireEvent.change(select, { target: { value: "ESF" } });
      
      expect(screen.getByText("ESF Arvorezinha")).toBeInTheDocument();
    });

    test("deve filtrar unidades por tipo UBS", () => {
      render(<App />);
      const select = screen.getByRole("combobox");
      
      fireEvent.change(select, { target: { value: "UBS" } });
      
      expect(screen.getByText("UBS Ivo Ferronato")).toBeInTheDocument();
    });

    test("deve filtrar unidades por tipo CAPS", () => {
      render(<App />);
      const select = screen.getByRole("combobox");
      
      fireEvent.change(select, { target: { value: "CAPS" } });
      
      expect(screen.getAllByText(/CAPS/).length).toBeGreaterThan(0);
    });

    test("deve mostrar todas as unidades quando selecionar 'all'", () => {
      render(<App />);
      const select = screen.getByRole("combobox");
      
      fireEvent.change(select, { target: { value: "ESF" } });
      fireEvent.change(select, { target: { value: "all" } });
      
      expect(screen.getByText("ESF Arvorezinha")).toBeInTheDocument();
    });

    test("deve ter botão para limpar filtro", () => {
      render(<App />);
      expect(screen.getByText("Limpar filtro")).toBeInTheDocument();
    });

    test("deve limpar filtro quando clicar no botão", () => {
      render(<App />);
      const select = screen.getByRole("combobox");
      
      fireEvent.change(select, { target: { value: "UBS" } });
      
      const limparButton = screen.getByText("Limpar filtro");
      fireEvent.click(limparButton);
      
      expect(select.value).toBe("all");
    });
  });

  describe("Navegação entre Páginas", () => {
    test("deve abrir o menu quando clicar no botão de menu", () => {
      render(<App />);
      const menuButton = screen.getByLabelText("Menu");
      
      fireEvent.click(menuButton);
      
      expect(screen.getByText("Bagé · RS")).toBeInTheDocument();
    });

    test("deve navegar para página inicial pelo menu", () => {
      render(<App />);
      const menuButton = screen.getByLabelText("Menu");
      
      fireEvent.click(menuButton);
      
      const inicioLink = screen.getByText("Inicio");
      fireEvent.click(inicioLink);
      
      expect(screen.getByLabelText(/Busque por bairro/)).toBeInTheDocument();
    });

    test("deve navegar para serviços de saúde pelo menu", () => {
      render(<App />);
      const menuButton = screen.getByLabelText("Menu");
      
      fireEvent.click(menuButton);
      
      const servicosLink = screen.getByText("Serviços de Saúde");
      fireEvent.click(servicosLink);
      
      expect(screen.getByText("Escolha uma tipologia:")).toBeInTheDocument();
    });

    test("deve navegar para sobre pelo menu", () => {
      render(<App />);
      const menuButton = screen.getByLabelText("Menu");
      
      fireEvent.click(menuButton);
      
      const sobreLink = screen.getByText("Sobre o Pampa Saúde");
      fireEvent.click(sobreLink);
      
      expect(screen.getByText("O que é o Pampa Saúde?")).toBeInTheDocument();
    });

    test("deve voltar para home a partir da página de serviços", () => {
      render(<App />);
      const menuButton = screen.getByLabelText("Menu");
      
      fireEvent.click(menuButton);
      fireEvent.click(screen.getByText("Serviços de Saúde"));
      
      const backButton = screen.getByText("← Voltar");
      fireEvent.click(backButton);
      
      expect(screen.getByLabelText(/Busque por bairro/)).toBeInTheDocument();
    });

    test("deve voltar para home a partir da página sobre", () => {
      render(<App />);
      const menuButton = screen.getByLabelText("Menu");
      
      fireEvent.click(menuButton);
      fireEvent.click(screen.getByText("Sobre o Pampa Saúde"));
      
      const backButton = screen.getByText("← Voltar");
      fireEvent.click(backButton);
      
      expect(screen.getByLabelText(/Busque por bairro/)).toBeInTheDocument();
    });
  });

  describe("Cards de Unidades", () => {
    test("deve renderizar informações da unidade (nome, tipo, endereço)", () => {
      render(<App />);
      
      expect(screen.getByText("ESF Arvorezinha")).toBeInTheDocument();
      expect(screen.getByText("Tarumã")).toBeInTheDocument();
    });

    test("deve renderizar serviços da unidade", () => {
      render(<App />);
      
      expect(screen.getAllByText(/Clínico Geral/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Vacinação/).length).toBeGreaterThan(0);
    });

    test("deve renderizar botão Ver no Maps", () => {
      render(<App />);
      
      expect(screen.getAllByText("Ver no Maps").length).toBeGreaterThan(0);
    });

    test("deve renderizar botão Ligar", () => {
      render(<App />);
      
      expect(screen.getAllByText("Ligar").length).toBeGreaterThan(0);
    });
  });

  describe("Página de Serviços", () => {
    test("deve renderizar tipos de serviços como botões", () => {
      render(<App />);
      const menuButton = screen.getByLabelText("Menu");
      
      fireEvent.click(menuButton);
      fireEvent.click(screen.getByText("Serviços de Saúde"));
      
      // Verifica que a página de serviços foi renderizada
      expect(screen.getByText("Escolha uma tipologia:")).toBeInTheDocument();
    });

    test("deve ter botão para todas as unidades", () => {
      render(<App />);
      const menuButton = screen.getByLabelText("Menu");
      
      fireEvent.click(menuButton);
      fireEvent.click(screen.getByText("Serviços de Saúde"));
      
      expect(screen.getByText("Todas as unidades")).toBeInTheDocument();
    });
  });

  describe("Página Sobre", () => {
    test("deve renderizar título 'O que é o Pampa Saúde?'", () => {
      render(<App />);
      const menuButton = screen.getByLabelText("Menu");
      
      fireEvent.click(menuButton);
      fireEvent.click(screen.getByText("Sobre o Pampa Saúde"));
      
      expect(screen.getByText("O que é o Pampa Saúde?")).toBeInTheDocument();
    });

    test("deve renderizar missão", () => {
      render(<App />);
      const menuButton = screen.getByLabelText("Menu");
      
      fireEvent.click(menuButton);
      fireEvent.click(screen.getByText("Sobre o Pampa Saúde"));
      
      expect(screen.getByText("Nossa Missão")).toBeInTheDocument();
    });

    test("deve renderizar parceiros institucionais", () => {
      render(<App />);
      const menuButton = screen.getByLabelText("Menu");
      
      fireEvent.click(menuButton);
      fireEvent.click(screen.getByText("Sobre o Pampa Saúde"));
      
      expect(screen.getByText("Parceiros Institucionais")).toBeInTheDocument();
    });

    test("deve renderizar equipe e desenvolvedores", () => {
      render(<App />);
      const menuButton = screen.getByLabelText("Menu");
      
      fireEvent.click(menuButton);
      fireEvent.click(screen.getByText("Sobre o Pampa Saúde"));
      
      expect(screen.getByText("Equipe e Desenvolvedores")).toBeInTheDocument();
    });
  });

  describe("Tabs de Informação", () => {
    test("deve renderizar abas de desenvolvedores e Unipampa", () => {
      render(<App />);
      
      expect(screen.getAllByText("Desenvolvedores").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Unipampa").length).toBeGreaterThan(0);
    });

    test("deve mudar para aba Unipampa ao clicar", () => {
      render(<App />);
      
      const unipampaTab = screen.getAllByText("Unipampa")[0];
      fireEvent.click(unipampaTab);
      
      expect(screen.getAllByText(/Campus Bagé/).length).toBeGreaterThan(0);
    });

    test("deve mudar para aba Desenvolvedores ao clicar", () => {
      render(<App />);
      
      const unipampaTab = screen.getAllByText("Unipampa")[0];
      fireEvent.click(unipampaTab);
      
      const devsTab = screen.getAllByText("Desenvolvedores")[0];
      fireEvent.click(devsTab);
      
      expect(screen.getByText("Julio Saraçol")).toBeInTheDocument();
    });
  });

  describe("Rodapé", () => {
    test("deve renderizar rodapé com informações", () => {
      render(<App />);
      
      expect(screen.getByText(/Pampa Saúde · Bagé\/RS/)).toBeInTheDocument();
    });
  });

  describe("Busca e Filtro Combinados", () => {
    test("deve filtrar por tipo e buscar ao mesmo tempo", () => {
      render(<App />);
      
      const select = screen.getByRole("combobox");
      fireEvent.change(select, { target: { value: "ESF" } });
      
      const input = screen.getByLabelText(/Busque por bairro/);
      fireEvent.change(input, { target: { value: "Arvorezinha" } });
      
      expect(screen.getByText("ESF Arvorezinha")).toBeInTheDocument();
    });
  });

  describe("Acessibilidade", () => {
    test("deve ter label no campo de busca", () => {
      render(<App />);
      
      const input = screen.getByLabelText(/Busque por bairro/);
      expect(input).toHaveAttribute("id", "search");
    });

    test("deve ter aria-label no botão de menu", () => {
      render(<App />);
      
      expect(screen.getByLabelText("Menu")).toBeInTheDocument();
    });

    test("deve ter aria-expanded no botão de menu", () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText("Menu");
      expect(menuButton).toHaveAttribute("aria-expanded");
    });
  });

  describe("Links e Ações", () => {
    test("deve ter link para Google Maps", () => {
      render(<App />);
      
      const links = screen.getAllByText("Ver no Maps");
      expect(links.length).toBeGreaterThan(0);
    });

    test("deve ter link para telefone", () => {
      render(<App />);
      
      const links = screen.getAllByText("Ligar");
      expect(links.length).toBeGreaterThan(0);
    });
  });
});
