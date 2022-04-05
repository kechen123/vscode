<template>
  <div class="welcome">
    <div class="logo"></div>
    <div class="watermark">
      <div class="watermark-box">
        <dl>
          <dt>Show All Commands</dt>
          <dd>
            <div title="Control+Shift+P" style="color: rgb(204, 204, 204)">
              <span class="key">Ctrl</span><span>+</span><span class="key">Shift</span><span>+</span
              ><span class="key">P</span>
            </div>
          </dd>
        </dl>
        <dl>
          <dt>Go to File</dt>
          <dd>
            <div title="Control+P">
              <span class="key">Ctrl</span><span>+</span><span class="key">P</span>
            </div>
          </dd>
        </dl>
        <dl>
          <dt>Find in Files</dt>
          <dd>
            <div title="Control+Shift+F">
              <span class="key">Ctrl</span><span>+</span><span class="key">Shift</span><span>+</span
              ><span class="key">F</span>
            </div>
          </dd>
        </dl>
        <dl>
          <dt>Toggle Full Screen</dt>
          <dd>
            <div title="F11">
              <span class="key">F11</span>
            </div>
          </dd>
        </dl>
        <dl>
          <dt>Show Settings</dt>
          <dd>
            <div title="Control+,">
              <span class="key">Ctrl</span><span>+</span><span class="key">,</span>
            </div>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.welcome {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .logo {
    background-image: url('@/assets/letterpress-dark.svg');
    background-size: 100% 100%;
    height: 260px;
    width: 260px;
    background-position-y: calc(50% - 100px);
    display: block;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
  .watermark {
    display: block;
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    .watermark-box {
      display: inline-table;
      border-collapse: separate;
      border-spacing: 13px 17px;
      dl {
        display: table-row;
        opacity: 0.8;
        cursor: default;
        color: hsla(0, 0%, 100%, 0.6);
        dt {
          text-align: right;
          letter-spacing: 0.04em;
          display: table-cell;
        }
        dd {
          text-align: left;
          display: table-cell;
          .monaco-keybinding {
            display: flex;
            align-items: center;
            line-height: 10px;
            color: rgb(204, 204, 204);
          }
        }
      }
      .key {
        display: inline-block;
        border-style: solid;
        border-width: 1px;
        border-radius: 3px;
        vertical-align: middle;
        font-size: 11px;
        padding: 3px 5px;
        margin: 0 2px;
        background-color: rgba(128, 128, 128, 0.17);
        border-color: rgba(51, 51, 51, 0.6) rgba(51, 51, 51, 0.6) rgba(68, 68, 68, 0.6);
        box-shadow: rgb(0 0 0 / 36%) 0px -1px 0px inset;
      }
    }
  }
}
</style>
