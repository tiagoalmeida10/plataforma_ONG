
(function(){
  'use strict';
  const byId = (id) => document.getElementById(id);
  function maskCPF(value){
    return value.replace(/\D/g,'').slice(0,11)
      .replace(/(\d{3})(\d)/,'$1.$2')
      .replace(/(\d{3})(\d)/,'$1.$2')
      .replace(/(\d{3})(\d{1,2})$/,'$1-$2');
  }
  function maskCEP(value){
    return value.replace(/\D/g,'').slice(0,8).replace(/(\d{5})(\d{1,3})/,'$1-$2');
  }
  function maskPhone(value){
    const digits = value.replace(/\D/g,'').slice(0,11);
    const ddd = digits.slice(0,2);
    const rest = digits.slice(2);
    if(!ddd) return '';
    if(rest.length > 5){
      return `(${ddd}) ${rest.slice(0,5)}-${rest.slice(5,9)}`;
    } else if (rest.length > 0){
      return `(${ddd}) ${rest}`;
    }
    return `(${ddd}`;
  }
  function attachMask(input, masker){
    if(!input) return;
    input.addEventListener('input', ()=> {
      const pos = input.selectionStart;
      const before = input.value;
      input.value = masker(input.value);
      const diff = input.value.length - before.length;
      input.setSelectionRange(Math.max(0,pos+diff), Math.max(0,pos+diff));
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    attachMask(byId('cpf'), maskCPF);
    attachMask(byId('cep'), maskCEP);
    attachMask(byId('telefone'), maskPhone);
    const y = document.querySelectorAll('.js-year');
    y.forEach(el => el.textContent = new Date().getFullYear());
    const form = document.querySelector('form');
    if(form){
      form.addEventListener('submit', (ev)=>{
        const ok = form.checkValidity();
        form.querySelectorAll('input,select,textarea').forEach(el => {
          el.setAttribute('aria-invalid', !el.checkValidity());
        });
        if(!ok){
          const firstInvalid = form.querySelector(':invalid');
          if(firstInvalid){ firstInvalid.focus(); }
          ev.preventDefault();
        }
      });
    }
  });
})();
