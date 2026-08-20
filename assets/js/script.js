document.addEventListener('DOMContentLoaded', () => {
    const btnSample = document.getElementById('btnSample');
    const btnParse = document.getElementById('btnParse');

    if (btnSample) {
        btnSample.addEventListener('click', loadSampleDump);
    }

    if (btnParse) {
        btnParse.addEventListener('click', parseSamData);
    }
});

const EMPTY_LM_HASH = "aad3b435b51404eeaad3b435b51404ee";
const EMPTY_NT_HASH = "31d6cfe0d16ae931b73c59d7e0c089c0";

function loadSampleDump() {
    const sample = "Administrator:500:aad3b435b51404eeaad3b435b51404ee:209c6174da490caeb422f3fa5a7ae634:::\n" +
        "Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::\n" +
        "m.soares:1004:aad3b435b51404eeaad3b435b51404ee:b4b9b02e6f09a9bd760f388b67351e2b:::";
    document.getElementById('samInput').value = sample;
}

function parseSamData() {
    const rawInput = document.getElementById('samInput').value;
    const tableBody = document.getElementById('resultsTableBody');
    const resultsSection = document.getElementById('resultsSection');

    tableBody.innerHTML = '';

    if (!rawInput.trim()) {
        alert("Por favor, forneça strings estruturadas obtidas a partir de ferramentas de dump ou relatórios de auditoria SAM.");
        return;
    }

    const lines = rawInput.split('\n');
    let validRowsCount = 0;

    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return;

        const tokens = trimmedLine.split(':');

        if (tokens.length >= 4) {
            validRowsCount++;

            const username = tokens[0].trim();
            const rid = tokens[1].trim();
            const lmHash = tokens[2].trim();
            const ntHash = tokens[3].trim();

            const tr = document.createElement('tr');

            // 1. Coluna de Usuário
            const tdUser = document.createElement('td');
            tdUser.className = 'td-username';
            tdUser.textContent = username;

            // 2. Coluna de RID
            const tdRid = document.createElement('td');
            const badgeRid = document.createElement('span');
            badgeRid.className = 'badge-rid';
            badgeRid.textContent = rid;
            tdRid.appendChild(badgeRid);

            // 3. Coluna de LM Hash
            const tdLm = document.createElement('td');
            if (lmHash === EMPTY_LM_HASH || !lmHash) {
                const spanEmpty = document.createElement('span');
                spanEmpty.className = 'hash-empty';
                spanEmpty.textContent = "Vazio / Desativado";
                tdLm.appendChild(spanEmpty);
            } else {
                const spanHash = document.createElement('span');
                spanHash.className = 'hash-text hash-text-muted';
                spanHash.textContent = lmHash;
                tdLm.appendChild(spanHash);
            }

            // 4. Coluna de NT/NTLM Hash
            const tdNt = document.createElement('td');
            if (ntHash === EMPTY_NT_HASH || !ntHash) {
                const spanEmpty = document.createElement('span');
                spanEmpty.className = 'hash-empty';
                spanEmpty.textContent = "Conta sem Senha";
                tdNt.appendChild(spanEmpty);
            } else {
                const spanHash = document.createElement('span');
                spanHash.className = 'hash-text';
                spanHash.textContent = ntHash;
                tdNt.appendChild(spanHash);
            }

            // 5. Status de Risco
            const tdStatus = document.createElement('td');
            const statusText = document.createElement('span');
            statusText.className = 'status-text';

            const numericRid = parseInt(rid, 10);
            if (numericRid === 500) {
                statusText.textContent = "Administrador Padrão (Crítico)";
                statusText.classList.add('status-admin');
            } else if (ntHash === EMPTY_NT_HASH) {
                statusText.textContent = "Alerta: Senha em Branco";
                statusText.classList.add('status-danger');
            } else {
                statusText.textContent = "Usuário Comum / OK";
                statusText.classList.add('status-ok');
            }
            tdStatus.appendChild(statusText);

            tr.appendChild(tdUser);
            tr.appendChild(tdRid);
            tr.appendChild(tdLm);
            tr.appendChild(tdNt);
            tr.appendChild(tdStatus);

            tableBody.appendChild(tr);
        }
    });

    if (validRowsCount > 0) {
        resultsSection.style.display = 'block';
    } else {
        alert("Nenhuma linha compatível com a sintaxe padrão de dump (usuário:RID:LM:NT) foi identificada.");
    }
}