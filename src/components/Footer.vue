<template>
  <footer>
    <ul>
      <li>
        <a
          tabindex="-1"
          role="button"
          aria-label="No Problems"
          style="background-color: rgb(22, 130, 93)"
        >
          <span class="codicon codicon-remote"></span>
        </a>
      </li>
      <li>
        <a tabindex="-1" role="button" aria-label="No Problems">
          <span class="codicon codicon-error"></span> <span>0</span>
          <span class="codicon codicon-warning"></span> <span>0</span>
        </a>
      </li>
      <li>
        <a tabindex="-1" role="button" aria-label="信息: 8 条">
          <span class="codicon codicon-link"></span>
          <span>webSocket已连接</span>
        </a>
      </li>
    </ul>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
footer {
  background-color: rgb(0, 122, 204);
  color: rgb(255, 255, 255);
  width: 100%;
  height: 22px;
  min-height: 22px;
  font-size: 12px;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    li {
      height: 100%;
      display: inline-block;
      line-height: 22px;
      height: 100%;
      vertical-align: top;
      a {
        cursor: pointer;
        display: flex;
        height: 100%;
        padding: 0 5px;
        white-space: pre;
        align-items: center;
        text-overflow: ellipsis;
        overflow: hidden;
        outline-width: 0;

        span.codicon {
          text-align: center;
          font-size: 14px;
          color: inherit;
          margin: 0 4px;
        }
      }
      a:hover {
        background-color: rgba(255, 255, 255, 0.12);
      }
    }
  }
}
</style>
