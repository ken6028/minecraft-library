import { API_Category_Update } from "@/app/api/category/[id]/client";
import { API_Category_Create } from "@/app/api/category/client";
import { Toggle } from "@/components/props/input/toggle/input";
import { EXModel_BookCategories, EXModel_BookCategory } from "@/libs/db";
import { useState } from "react";
import { Element_Controller_Response, Template } from "react-client-screen";





export function Form_Category(onCreate: () => void) {
    const [categories, setCategories] = useState<EXModel_BookCategories>();
    const [name, setName] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    
    const form = Template.Fill_Form({
        children: (
            <>
                <label>
                    名前
                    <input type="text" value={name} onChange={(ev) => {setName(ev.target.value)}} />
                </label>
                <label>
                    公開
                    <Toggle checked={isPublic} onChange={() => {setIsPublic(v => !v)}} />
                </label>
                <button type="submit">
                    作成
                </button>
            </>
        ),
        async action() {
            if (!categories) return;
            const res = await API_Category_Create({
                name,
                isPublic,
                index: categories.length
            });
            if (res) {
                categories.push(res)
                // onCreate();
                form.controller.hide();
            }

        }
    })


    const controller = {
        show(categories: EXModel_BookCategories) {
            setCategories(categories);
            form.controller.show();
        },
        hide() {
            form.controller.hide();
        }
    }



    return (
        {
            ...form,
            controller
        }
    )
}














type UpdateCall = (category: EXModel_BookCategory) => void;
type Controller = {
    show(category: EXModel_BookCategory): void;
    hide(): void;
}


export function Form_Category_Edit(): Element_Controller_Response<Controller, boolean> {
    const [raw, setRaw] = useState<EXModel_BookCategory>();
    const [name, setName] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    const [updating, setUpdating] = useState(false);
    
    
    
    const canSave = name.trim() !== "" && (name !== raw?.name || isPublic !== raw?.isPublic);
    
    
    const form = Template.Fill_Form({
        children: (
            updating ? (
                <p>保存中...</p>
            ) : (
                <>
                    <label>
                        名前
                        <input type="text" value={name} onChange={(ev) => {setName(ev.target.value)}} />
                    </label>
                    <label>
                        公開
                        <Toggle checked={isPublic} onChange={() => {setIsPublic(v => !v)}} />
                    </label>
                    <button disabled={!canSave} type="submit">
                        保存
                    </button>
                </>
            )
        ),
        async action() {
            if (!raw) return;
            
            setUpdating(true);
            const res = await API_Category_Update(raw.id, {
                name,
                isPublic
            });
            setUpdating(false);

            if (res) {
                raw.name = name;
                raw.isPublic = isPublic;
                form.controller.hide();
            }
        }
    });



    const controller: Controller = {
        show(category) {
            setRaw(category);
            setName(category.name);
            setIsPublic(category.isPublic);
            form.controller.show();
        },
        hide() {
            form.controller.hide();
        }
    };


    return (
        {
            ...form,
            controller
        }
    );
}