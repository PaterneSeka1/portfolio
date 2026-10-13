import { inputClass, labelClass } from "./formStyles"
import { formatField } from "../../../../lib/admin/form-fields"

/**
 * English version of a record, stored in its `en` JSON column.
 * Empty fields fall back to the French content on /en pages.
 */
export default function TranslationFields({ fields, values }) {
  return (
    <details className="rounded-lg border border-gray-200 p-4">
      <summary className="cursor-pointer text-sm font-semibold text-navy">Version anglaise (/en)</summary>
      <div className="mt-4 space-y-4">
        <p className="text-sm text-navy/60">Champs facultatifs : un champ vide reprend la version française.</p>
        {fields.map((field) => {
          const id = `en_${field.name}`
          const defaultValue = formatField(field.kind ?? "text", values?.[field.name])
          return (
            <div key={id}>
              <label htmlFor={id} className={labelClass}>{field.label}</label>
              {field.rows ? (
                <textarea id={id} name={id} rows={field.rows} defaultValue={defaultValue} className={inputClass} />
              ) : (
                <input id={id} name={id} defaultValue={defaultValue} className={inputClass} />
              )}
            </div>
          )
        })}
      </div>
    </details>
  )
}
