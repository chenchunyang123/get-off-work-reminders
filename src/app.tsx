import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import styles from "./app.module.css";
import duration from "dayjs/plugin/duration";

import runImg from "./assets/run.png";

dayjs.extend(duration);

function App() {
  const [displayText, setDisplayText] = useState("");
  const [inWorkTime, setInWorkTime] = useState(false);

  const countDownIntervalRef = React.useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    // 每秒去监听当前时间是不是在工作时间，然后修改inWorkTime
    const timer = setInterval(() => {
      const now = dayjs();
      const start = dayjs().set("hour", 10).set("minute", 0).set("second", 0);
      const end = dayjs().set("hour", 19).set("minute", 0).set("second", 0);
      setInWorkTime(now.isAfter(start) && now.isBefore(end));

      // 判断当前时间等于11点40吃饭时间
      if (
        now.isSame(dayjs().set("hour", 11).set("minute", 40).set("second", 0))
      ) {
        // 发送通知
        window?.electron?.sendNotification(
          "到吃饭时间了，快去热饭🚀🚀🚀\n到吃饭时间了，快去热饭🚀🚀🚀\n到吃饭时间了，快去热饭🚀🚀🚀\n到吃饭时间了，快去热饭🚀🚀🚀"
        );
      }

      // 判断当前时间等于19点
      if (now.isSame(end)) {
        // 发送通知
        window?.electron?.sendNotification(
          "到下班时间了，赶紧跑🚀🚀🚀\n到下班时间了，赶紧跑🚀🚀🚀\n到下班时间了，赶紧跑🚀🚀🚀\n到下班时间了，赶紧跑🚀🚀🚀"
        );
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    window?.electron?.sendNotification(
      "到下班时间了，赶紧跑🚀🚀🚀\n到下班时间了，赶紧跑🚀🚀🚀\n到下班时间了，赶紧跑🚀🚀🚀\n到下班时间了，赶紧跑🚀🚀🚀"
    );
  }, [])

  useEffect(() => {
    // 不在工作时间就清空倒计时
    if (!inWorkTime) {
      clearInterval(countDownIntervalRef.current);
      setDisplayText("快跑🚀🚀🚀");
      return;
    }
    // 根据当前客户端的时间，计算出当前时间距离下班时间的剩余时间，下班时间为当天的19点，使用dayjs, 格式化输出时:分:秒，时分秒保持展示两位，不足两位首位补0，通过setInterval每隔一秒更新一次倒计时
    countDownIntervalRef.current = setInterval(() => {
      const now = dayjs();
      const end = dayjs().set("hour", 19).set("minute", 0).set("second", 0);

      const diff = dayjs.duration(end.diff(now));
      const hours = diff.hours().toString().padStart(2, "0");
      const minutes = diff.minutes().toString().padStart(2, "0");
      const seconds = diff.seconds().toString().padStart(2, "0");
      setDisplayText(`${hours}:${minutes}:${seconds}`);
    }, 1000);
    return () => {
      clearInterval(countDownIntervalRef.current);
    };
  }, [inWorkTime]);

  return (
    <div className={styles.app}>
      {displayText}
      <img src={runImg} alt="" />
    </div>
  );
}

export default App;
