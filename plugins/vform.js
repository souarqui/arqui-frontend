import Form from "vform";

export default defineNuxtPlugin((nuxtApp) => {
  Form.prototype.submit = function submit(method, url, config = {}) {
    const configEnv = useRuntimeConfig();
    this.startProcessing();

    const data = method === "get" ? { params: this.data() } : this.data();

    return new Promise((resolve, reject) => {
      $fetch(url, {
        baseURL: configEnv.public.apiUrl,
        withCredentials: true,
        headers: {
          "App-Type": "0",
        },
        method,
        body: data,
      })
        .then((response) => {
          this.finishProcessing();
          resolve(response);
        })
        .catch((error) => {
          this.busy = false;

          if (error.response) {
            this.errors.set(error.response._data.errors);
          }

          reject(error);
        });
    });
  };

  return {
    provide: {
      vform: (...params) => new Form(...params),
    },
  };
});
