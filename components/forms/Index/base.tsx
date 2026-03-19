import { useState } from "react";
import { Element_Controller_Response, Template } from "react-client-screen";

import styles from "./base.module.css";
import { Button } from "@/components/props/input/button/input";
import { API_IndexRecord } from "@/app/api/api";


type GenCall<RecordType extends API_IndexRecord> = (v: RecordType) => string;

type Controller<RecordType extends API_IndexRecord> = {
    show(v: RecordType[]): void;
    hide(): void;
}

type API_Call<RecordType extends API_IndexRecord> = (v: RecordType[]) => Promise<boolean>;


export function Form_Index_Base<RecordType extends API_IndexRecord>(gen: GenCall<RecordType>, api: API_Call<RecordType>): Element_Controller_Response<Controller<RecordType>, boolean> {
    const [_, setUpdate] = useState(0);

    const [raw, setRaw] = useState<RecordType[]>([]);
    const [records, setRecords] = useState<RecordType[]>([]);

    const [updating, setUpdating] = useState(false);



    const sortedRecords = records.sort((a, b) => a.index - b.index);

    function up(index: number) {
        if (index === 0) return; // 最初の本は上に移動できない
        const targetRecord = sortedRecords[index];
        const aboveRecord = sortedRecords[index - 1];
        if (targetRecord && aboveRecord) {
            targetRecord.index = index - 1;
            aboveRecord.index = index;
            setUpdate(v => v+1); // 状態を更新して再レンダリング
        }
    }


    function down(index: number) {
        if (index === sortedRecords.length - 1) return; // 最後の本は下に移動できない
        const targetRecord = sortedRecords[index];
        const belowRecord = sortedRecords[index + 1];
        if (targetRecord && belowRecord) {
            targetRecord.index = index + 1;
            belowRecord.index = index;
            setUpdate(v => v+1); // 状態を更新して再レンダリング
        }
    }
    
    
    
    const form = Template.Fill_Form({
        children: (
            updating ? (
                <h2>更新中...</h2>
            ) : (
                <>
                    <div>
                        {
                            sortedRecords.map((record, index) => {
                                record.index = index;//!!! 削除などによるズレ防止
                                
                                return (
                                    <div key={index} className={styles.record}>
                                        {gen(record)}
                                        <div className={styles.buttons}>
                                            <Button onClick={(ev) => {ev.preventDefault(); up(index)}}>
                                                上へ
                                            </Button>
                                            <Button onClick={(ev) => {ev.preventDefault(); down(index)}}>
                                                下へ
                                            </Button>
                                        </div>
                                    </div>
                                ) 
                            })
                        }
                    </div>
                    <button type="submit">
                        変更
                    </button>
                </>
            )
        ),
        async action() {
            setUpdating(true);
            const res = await api(records);
            setUpdating(false)
            if (res) {
                records.forEach(record => {
                    const target = raw.find(b => b.id === record.id);
                    if (target) target.index = record.index;
                });
                form.controller.hide();
            }
        }
    });
    
    
    const controller: Controller<RecordType> = {
        show(records) {
            setRaw(records);
            setRecords(structuredClone(records));
            form.controller.show();
        },
        hide() {
            form.controller.hide();
        }
    };


    
    
    return (
        {
            element: form.element,
            status: form.status,
            controller
        }
    )
}