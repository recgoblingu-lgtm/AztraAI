let knowledge = [];

async function loadKnowledge() {
  try {
    let res = await fetch("data/knowledge.json");
    let data = await res.json();
    knowledge = data.topics;
  } catch {
    knowledge = [];
  }
}

function findBestMatch(input) {
  input = input.toLowerCase();

  for (let item of knowledge) {
    if (input.includes(item.keyword)) {
      return item.info;
    }
  }

  return null;
}

function generateResponse(input) {
  let match = findBestMatch(input);

  if (input.includes("hello")) return "yo";
  if (input.includes("who are you")) return "I'm AztraAI";

  if (match) {
    return match;
  }

  return "I couldn't find much, try rewording that.";
}

async function send() {
  let input = document.getElementById("input");
  let chat = document.getElementById("chat");

  let msg = input.value;

  chat.innerHTML += `<div><b>You:</b> ${msg}</div>`;

  let reply = generateResponse(msg);

  chat.innerHTML += `<div><b>AztraAI:</b> ${reply}</div>`;

  input.value = "";
}

loadKnowledge();
