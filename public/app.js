document.getElementById("subscribeBtn").addEventListener("click", async () => {
  try {
    const res = await fetch("/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@test.com" })
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url; // يحوّلك على Stripe
    } else {
      console.log("No url returned", data);
      alert("ما رجع رابط من السيرفر");
    }
  } catch (e) {
    console.error(e);
    alert("صار خطأ بالاتصال بالسيرفر");
  }
});