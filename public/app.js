document.getElementById("go").onclick = async () => {
  const text = document.getElementById("text").value;
  const res = await fetch("/api", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({text})});
  const body = await res.json();
  document.getElementById("out").textContent = res.ok ? body.iso + "\n" + body.unix : body.error;
};
