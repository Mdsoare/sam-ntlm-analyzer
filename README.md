# 🔒 Analisador Forense de SAM & Hashes NTLM

![CI Pipeline](https://github.com/Mdsoare/sam-ntlm-analyzer/actions/workflows/ci-pipeline.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Security: CSP Compliant](https://img.shields.io/badge/Security-CSP--Compliant-success.svg)

<!-- Badges de Linguagens, Ecossistema e DevSecOps -->
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Dependabot](https://img.shields.io/badge/Dependabot-025E8C?style=for-the-badge&logo=dependabot&logoColor=white)
![SAST & SCA](https://img.shields.io/badge/DevSecOps-SAST%20%26%20SCA-red?style=for-the-badge&logo=shield&logoColor=white)

> Aplicação web *client-side* de alta performance para auditoria local, parsing e análise forense de dumps de registros do Windows (`SAM Hives` e dados no formato `PWDUMP`).

---

## 📋 Propósito do Projeto

Em investigações forenses digitais e auditorias de segurança defensiva (*Blue Team*), a análise de credenciais extraídas localmente é uma etapa crítica.

O **Analisador Forense de SAM & Hashes NTLM** foi desenvolvido com a premissa **Privacy First**: todo o processamento, tokenização e categorização dos dados ocorrem 100% no contexto da memória local do seu navegador. **Nenhum hash, nome de usuário ou dado corporativo/governamental trafega pela rede ou sai da sua estação de trabalho.**

---

## ✨ Funcionalidades

* 🚀 **Parsing Instantâneo PWDUMP/SAM:** Leitura e separação automática das colunas `Username`, `RID`, `LM Hash` e `NTLM Hash`.
* 🛡️ **Análise Automática de Risco:** Identificação imediata de contas privileged (ex: Administrator RID 500) e alertas para senhas em branco/nulas (`31d6cfe0d16ae931b73c59d7e0c089c0`).
* 🔒 **DevSecOps & CSP Hardened:** Código sem scripts/estilos *inline*, protegido contra injeção de código DOM-based XSS e totalmente compatível com políticas estritas de *Content Security Policy* (CSP).
* 🧪 **Amostra Integrada para Testes:** Botão interativo para carregamento de sintaxe de teste para validações rápidas.
* ⚡ **100% Client-Side:** Funciona nativamente em qualquer navegador sem necessidade de suporte a servidor backend.

---

## 📖 Guia de Uso

### Artefatos de Entrada (O que carregar)

O analisador processa dados textuais obtidos a partir da extração e parsing das hives de registro do Windows (`SAM` e `SYSTEM`).

* **Nome do Artefato Original:** `SAM` (localizado em `%SystemRoot%\System32\config\SAM` ou extraído via cópia de sombra / Volume Shadow Copy / ferramentas de triage).

* **Formato Esperado no Campo de Texto:** Saída padrão em formato PWDUMP (gerada por utilitários como [`secretsdump.py`](https://github.com/fortra/impacket.git) do Impacket, Mimikatz, pwall ou ferramentas de extração offline)

* **Sintaxe do Texto:**

   ```text
   <Username>:<RID>:<LM_Hash>:<NTLM_Hash>:::
   ```

* **Exemplo de Conteúdo:**

   ```text
   Administrator:500:aad3b435b51404eeaad3b435b51404ee:209c6174da490caeb422f3fa5a7ae634:::
   Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
   ```

---

### Passo a Passo de Utilização

1. **Acesse a Aplicação:** Abra a interface web (`index.html` via GitHub Pages ou localmente).
2. **Obtenha os Hashes:** Copie a saída de texto gerada na sua etapa de auditoria forense/extração PWDUMP.
3. **Insira os Dados:** Cole as linhas estruturadas diretamente na área de texto "INSIRA O DUMP DE LINHAS DO SAM OU PWDUMP".
   * **Opcional:** Para validar o funcionamento da interface sem dados reais, clique no botão Carregar Amostra PWDUMP.
4. **Execute a Análise:** Clique no botão principal Analisar e Extrair Hashes.
5. **Avalie o Relatório:** A tabela de resultados exibirá a análise categorizada:
   * **Usuário Local & RID:** Mapeamento de contas e identificadores de segurança.
   * **LM & NTLM Hashes:** Separação limpa dos hashes e identificação de hashes nulos/vazios.
   * **Status de Risco:** Indicadores visuais automáticos para contas críticas (RID 500) ou contas com senha em branco

---

### Como ter acesso ao `secretsdump.py`

O `secretsdump.py` faz parte do framework **Impacket**, uma coleção de classes Python mantida pela SecureAuth para interagir com protocolos de rede e manipular hashes/credenciais Windows.

Ele pode ser obtido e instalado de três formas principais:

1. Repositório Oficial no GitHub (Código Fonte / Modos de Execução Directa)
   * **Link:** [GitHub Impacket](https://github.com/fortra/impacket)
   * Localização do script no repositório: `examples/secretsdump.py`

   **Execução via clone direto:**

   ```bash
   git clone https://github.com/fortra/impacket.git
   cd impacket
   pip install .
   # O script ficará disponível como secretsdump.py ou impacket-secretsdump
   ```

2. Instalação via `pip` (Recomendado para Python)
   A maneira mais rápida de instalar e disponibilizar a ferramenta no seu ambiente Python (ambiente virtual ou global):

   ```bash
   pip install impacket
   ```

   Após a instalação, o comando impacket-secretsdump (ou secretsdump.py) estará acessível diretamente no seu terminal.

3. Distribuições Linux de Segurança (Kali Linux / Parrot OS)

   Nas distribuições voltadas para testes de segurança e perícia, o Impacket já vem pré-instalado ou pode ser instalado diretamente pelos repositórios do sistema:

   ```bash

   # Debian / Ubuntu / Kali Linux

   sudo apt update
   sudo apt install python3-impacket

   # Exemplo de uso direto no terminal

   impacket-secretsdump -sam SAM -system SYSTEM LOCAL
   ```

   **💡 Dica para Análise Offline de Registros Localmente**
   Para extrair os hashes do arquivo `SAM` e `SYSTEM` sem precisar de autenticação de rede (modo offline) e gerar a saída no formato compatível com o seu analisador:

   ```bash
   impacket-secretsdump -sam /caminho/para/SAM -system /caminho/para/SYSTEM LOCAL
   ```

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** HTML5, Pure CSS3 (Dark Theme) e Vanilla JavaScript (ES6+ sem dependências de runtime).
* **Gerenciamento & Pacotes:** Node.js & npm (DevDependencies e Scripts de Linting).
* **Automação & CI/CD:** GitHub Actions & GitHub Dependabot.
* **Segurança Estática (SAST):** ESLint (Flat Config), Stylelint, HTMLHint e TruffleHog (Secret Detection).
* **Análise de Dependências (SCA):** OSV-Scanner e npm audit.

---

## ⚠️ AVISO LEGAL E USO ÉTICO (DISCLAIMER)

### 🚨 Uso Estritamente Ético e Educacional

Esta ferramenta foi criada exclusivamente para **fins educacionais, auditorias autorizadas de segurança da informação, investigações forenses legítimas e atividades defensivas de Red/Blue Team**.

### ⛔ Isenção de Responsabilidade

1. **Autorização Prévia:** O uso desta ferramenta contra sistemas, redes ou bases de credenciais sem o consentimento formal e por escrito do proprietário é ilegal e passível de sanções civis e criminais.
2. **Uso Indevido:** O autor deste projeto (**Marcelo Soares / [Mdsoare](https://github.com/Mdsoare)**) **não se responsabiliza** por qualquer uso indevido, danos, vazamento de dados, incidentes de segurança ou violações legais causados pela utilização desta aplicação.
3. **Responsabilidade do Usuário:** A responsabilidade inteira pelo uso ético, legal e em conformidade com as regulamentações aplicáveis (como LGPD/GDPR) recai exclusivamente sobre o usuário que opera a ferramenta.

---

## 📜 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

*Desenvolvido por **Marcelo Soares** | Especialista em Segurança da Informação e Computação Forense.*
