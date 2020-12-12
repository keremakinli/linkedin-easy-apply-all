var delay = (ms) => new Promise((res) => setTimeout(res, ms));

function applyAllInPage(filter) {
  var arr = [
    ...document.querySelectorAll(
      ".full-width.artdeco-entity-lockup__title.ember-view a"
    ),
  ].map((item) => item.href);

  console.log(arr);
  nextFunc(arr);
}

async function nextFunc(arr) {
  for (let i = 0; i < arr.length; i++) {
    const link = arr[i];
    await next(link);
  }
}

async function next(link) {
  const win = window.open(link);
  try {
    win.focus();
    await delay(4000);
    if (win.document.querySelector(".jobs-s-apply__applied-date")) win.close();
    win.document.querySelector(".jobs-apply-button").click();
    while (true) {
      await delay(5000);
      win.document
        .querySelector(".jobs-easy-apply-modal .artdeco-button--primary")
        .click();
    }
  } catch (error) {
    if (win.document.querySelector(".jobs-post-apply__success-title--v2"))
      win.close();

  }
}

applyAllInPage();
