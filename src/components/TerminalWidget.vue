<template>

    <div @click="input_cmd.focus()" style="min-height: 350px;">
        <div ref="terminal" id="container">
        <div style="overflow: auto; max-width: 600px; white-space: pre-line; word-wrap: break-all; overflow:auto"
             id="scroll_container">
            <div style="height: 600px">
            <div v-if="banner" id="banner">
                <p>
                <img
                    v-if="banner.img"
                    :align="banner.img.align ? banner.img.align : 'left'"
                    :src="banner.img.link ? banner.img.link : '@/logo.png'"
                    :width="banner.img.width ? banner.img.width : '100px'"
                    :height="banner.img.height ? banner.img.height : '100px'"
                />
                </p>
                <h3 v-if="banner.header" style="letter-spacing: 4px">
                {{ banner.header }}
                </h3>
                <p v-if="banner.subHeader">{{ banner.subHeader }}</p>
                <p v-if="banner.helpHeader">{{ banner.helpHeader }}</p>
                <p></p>
            </div>
            <output ref="output"></output>
            <div id="input-line" class="input-line">
                <div class="prompt">
                <div>{{ banner.sign ? banner.sign : '>>' }}</div>
                </div>

                <input
                v-model="cmd_string"
                ref="input_cmd"
                @keydown.enter="cmd_enter($event)"
                @keydown.up="history_up()"
                @keydown.down="history_down()"
                @keydown.tab="($event) => $event.preventDefault()"
                class="cmdline"
                autofocus
                />
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted, onUnmounted, computed } from 'vue';
import { useUserProfileStore } from 'stores/user-profile-store';
const store = useUserProfileStore();
const user = computed(() => store)
var cmd_string = ref(''); // то, что вводит пользователь
var history = ref([]);
var histpos = ref(0);
var histtemp = ref(0);
const output = ref(null); // контейнер, куда добавляются новые элементы
const input_cmd = ref(null); // элементы строки ввода
const connection = ref(null);

const emit = defineEmits(['shell_output']);

const props = defineProps({
  shell_input: {
    required: false,
  },
  banner: {
    type: Object,
    required: false,
    default: () => {
      return {
        header: 'Ground Station Shell!',
        // subHeader: 'Shell is power just enjoy 🔥',
        helpHeader: 'Enter "help" for more information.',
        sign: 'VueShell $',
        // img: {
        //     align: 'left',
        //     // link: `@/logo.png`,
        //     width: 100,
        //     height: 100
        // }
      };
    },
  },
  commands: {
    type: Array,
  },
});

onMounted(() => {
    connection.value = new WebSocket(`ws://${process.env.API_URL}/websocket_api/ws/${user.value.user_id}`);
    connection.value.onopen = function (event) {
        console.log(event);
        console.log('Successfully connected to the echo websocket server...');
    };
    connection.value.onmessage = function (event) {
        output.value.insertAdjacentHTML(
            'beforeEnd',
            '<div class="ls-files" style="overflow:auto">' + event.data + '</div>'
        );
        cmd_string.value = '';
        input_cmd.value.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
        });
    };
    connection.value.onerror = function(error) {
        console.log(error);
    };

});
onUnmounted(() => {
    connection.value.close()
});
function send_ws(message) {
    connection.value.send(message);
}

function history_up() {
    if (history.value.length) {
        if (history.value[histpos.value]) {
            history.value[histpos.value] = cmd_string.value;
        } else {
         histtemp.value = cmd_string.value;
        }
    }
    // up 38
    histpos.value--;
    if (histpos.value < 0) {
        histpos.value = 0;
    }
    cmd_string.value = history.value[histpos.value]
        ? history.value[histpos.value]
        : histtemp.value;
}

function history_down() {
    if (history.value.length) {
        if (history.value[histpos.value]) {
        history.value[histpos.value] = cmd_string.value;
        } else {
        histtemp.value = cmd_string.value;
        }
    }
    histpos.value++;
    if (histpos.value > history.value.length) {
        histpos.value = history.value.length;
    }
    cmd_string.value = history.value[histpos.value]
        ? history.value[histpos.value]
        : histtemp.value;
}

function cmd_enter() {
    if (cmd_string.value) {
        history.value[history.value.length] = cmd_string.value;
        histpos.value = history.value.length;
    }
    //   Duplicate current input and append to output section.
    var line = input_cmd.value.parentNode.cloneNode(true);
    line.removeAttribute('id');
    line.classList.add('line');
    var input = line.querySelector('input.cmdline');
    input.autofocus = false;
    input.readOnly = true;
    output.value.appendChild(line);

    send_ws(cmd_string.value);

    if (cmd_string.value && cmd_string.value.trim()) {
        var args = cmd_string.value.split(' ').filter(function (val) {
            return val;
        });
        var cmd = args[0].toLowerCase();
        args = args.splice(1); // Remove cmd from arg list.
    }
    if (cmd == 'clear') {
        output.value.innerHTML = '';
        cmd_string.value = '';
    } else {
        if (props.commands) {
        props.commands.forEach((a) => {
            if (cmd == a.name) {
            add_to_output(a.get());
            return;
            }
        });
        }
        if (cmd_string.value.trim() != '') {
        emit('shell_output', cmd_string.value);
        }
        cmd_string.value = '';
    }
}

function add_to_output(html) {
    output.value.insertAdjacentHTML('beforeEnd', '<div style="white-space: pre-line; word-wrap: break-all; overflow:auto">' + html + '</div>');
    cmd_string.value = '';
}
</script>

<style lang="css" scoped>

::-webkit-scrollbar { width: 3px; height: 3px;}
::-webkit-scrollbar-track {  background-color: #999;}
::-webkit-scrollbar-track-piece { background-color: #ffffff;}
::-webkit-scrollbar-thumb { height: 50px; background-color: rgb(112, 111, 111); border-radius: 3px;}

#container {
  color: white;
  background-color: rgb(47, 43, 54);
  font-size: 11pt;
  font-family: Inconsolata, monospace;
  padding: 0.5em 1.5em 1em 1em;
  /* width: 50%; */
}

#container output {
  clear: both;
  width: 100%;
}
#scroll_container::-webkit-scrollbar-track {
  background-image: repeating-linear-gradient(
    45deg,
    red 0,
    red 1px,
    transparent 0,
    transparent 50%
  );
  background-size: 10px 10px;
}
#banner {
  margin-bottom: 3em;
}

img {
  margin-right: 20px;
}

.input-line {
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: flex;
  box-orient: horizontal;
  box-align: stretch;
  clear: both;
}

.input-line > div:nth-child(2) {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
}

.prompt {
  white-space: nowrap;
  color: #3a8b17;
  margin-right: 7px;
  display: -webkit-box;
  display: -moz-box;
  display: flex;
  box-pack: center;
  box-orient: vertical;
  user-select: none;
}

.cmdline {
  outline: none;
  background-color: transparent;
  margin: 0;
  width: 100%;
  font: inherit;
  border: none;
  color: inherit;
}

.ls-files {
  height: 45px;
  column-width: 100px;
}
</style>
