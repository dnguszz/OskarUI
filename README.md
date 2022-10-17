# WOOH UI

### install

```
npm install wooh-ui
```

<br>
<br>

## ToolTips

<br>
<br>

### import

```
import {ToolTips} from "wooh-ui";
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
