# OskarUI UI

### install

```
npm install oskar-ui
```

<br>
<br>

## Tooltip

<br>
<br>
마우스 커서나 클릭 이벤트로 요소에 부가 설명이 가능한 툴팁 기능입니다.
<br>
<br>

# Functions

1. 특정 DOM 에 특정 이벤트를 트리거링했을 때 메시지를 띄웁니다.

2. 메시지 박스의 위치를 선택할 수 있습니다.

3. 메시지 박스 오픈 트리거 이벤트를 선택할 수 있습니다.

<br>
<br>

### Get Started

```
import { Tooltip } from "oskar-ui";
```

<br>
<br>

### Props

\* 는 필수입니다.

| Name      | Type                                   | Default | Description                                 |
| --------- | -------------------------------------- | ------- | ------------------------------------------- |
| message\* | string                                 |         | 툴팁에 띄울 메시지를 문자열로 입력받습니다. |
| position  | 'top'<br>'bottom'<br>'left'<br>'right' | bottom  | 툴팁을 띄울 위치입니다.                     |
| trigger   | 'hover'<br>'click'                     | hover   | 툴팁을 띄울 이벤트를 선택합니다.            |
| size      | 'sm'<br>'md'<br>'lg'                   | md      | 툴팁의 사이즈를 결정합니다.                 |
| theme     | 'primary'<br>'secondary'               | primary | 툴팁의 테마를 결정합니다.                   |
