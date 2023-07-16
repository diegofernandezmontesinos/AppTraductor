import { Form } from "react-bootstrap"
import { SectionType } from "../types"


interface Props {
    type: SectionType
    loading?: boolean
    onChange: (value:string) => void
    value: string

}

const commonStyles = {border: 0, height:'200px', resize:'none' }

const getPlaceholder = ({ type, loading} : {type: SectionType, loading?: boolean} ) => {
    if(type==SectionType.From) return 'Introducir texto'
    if(loading) return 'Cargando...'
    return 'Traduciendo'
} 

export const TextArea = ({ type, value, loading, onChange }: Props ) => {
   
    const styles = type == SectionType.From 
    ?  commonStyles
    : {...commonStyles, background: '#f5f5f5'}

   const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
   }


    return (
        <Form.Control 
             autoFocus={type == SectionType.From}
            as='textarea' //que elemento debe renderizar
            disable={type == SectionType.To}
            placeholder={getPlaceholder({ type, loading})}
            style={styles}
            value={value}
            onChange={handleChange}
        />
    )
}