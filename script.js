$(document).ready(() => {
    const mensagemErro = $('.mensagemErro');
    const mensagemTarefa = $('.mensagemTarefa');
    let tarefas = [];

    $('form input').on('input', function() {
        mensagemErro.hide();
        mensagemTarefa.hide();
    });

    $('form').submit((e) => {
        e.preventDefault();

        const toDo = $('form input').val();
        const tarefaFormatadaMin = toDo.toLowerCase();

        if (toDo == '') {
            mensagemErro.fadeIn();
            setTimeout(function() {
                mensagemErro.fadeOut();
            }, 2100);
        } else if (tarefas.includes(tarefaFormatadaMin)) {
            mensagemTarefa.fadeIn();
            setTimeout(function() {
                mensagemTarefa.fadeOut();
            }, 2100);
        } else {
            adicionarTarefa(toDo, tarefaFormatadaMin);
            $('form input').val('');
        }
    });

    function adicionarTarefa(toDo, tarefaFormatadaMin) {
        const itemDeLista = $('<li style="display: none;"></li>');
        const divItens = $('<div class="divItens"></div>');
        const checkBox = $(`<input type="checkbox" id="${toDo}">`);
        const label = $(`<label for="${toDo}">${itemMaiusculo(toDo)}</label>`);
        const deletar = $('<span class="deletar">X</span>');

        itemDeLista.append(divItens);
        divItens.append(checkBox);
        divItens.append(label);
        divItens.append(deletar);

        $('ul').append(itemDeLista);
        itemDeLista.slideDown(170);

        tarefas.push(tarefaFormatadaMin);

        checkBox.click(function() {
            if (this.checked) {
                label.css('text-decoration', 'line-through');
            } else {
                label.css('text-decoration', 'none');
            }
        });

        deletar.click(function() {
            const itemApagado = deletar.closest('li');
            itemApagado.slideUp(() => {
                itemApagado.remove();
                const tarefaIndex = tarefas.indexOf(tarefaFormatadaMin);
                if (tarefaIndex > -1) {
                    tarefas.splice(tarefaIndex, 1);
                }
            });
        });
    }

    function itemMaiusculo(toDo) {
        return toDo.charAt(0).toUpperCase() + toDo.slice(1);
    }
});