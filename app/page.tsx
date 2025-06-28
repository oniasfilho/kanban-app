"use client";
import styles from "./page.module.scss";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { Textfield } from "@/components/Textfield/Textfield";

export default function Home() {
  return (
    <main className="main-wrapper">
      <div className="light-section">
        <div className={styles.checkboxWrapper}>
          <Checkbox label="Light Theme" theme="light" />
        </div>
      </div>
      <div className="dark-section">
        <div className={styles.checkboxWrapper}>
          <Textfield error={true} />
        </div>
      </div>
    </main>
  );
}
