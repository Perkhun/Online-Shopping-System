import { useEffect, useRef, useState } from 'react'
import Icon from '../assets/icon.png'

/**
 
 * @param {String} props.src 
 * @param {String} props.className 
 */
// type Props = {
//     src: string
//     className?: string
//     alt?:string
// }
const Image = ({ src, className, alt }) => { 
    const [upload, setUpload] = useState(true) 
    const [lose, setLose] = useState(true)

   
    const imgRef = useRef < HTMLImageElement > (null)
    useEffect(() => { 
        const ob = new IntersectionObserver((entries) => { 
            if (entries[0].isIntersecting) { 
                if (imgRef.current) {
                    imgRef.current.src = imgRef.current?.getAttribute('data-src')
                    ob.unobserve(imgRef.current) 
                }
            }
        }, { rootMargin: '100px' })
        if (imgRef.current) ob.observe(imgRef.current) 
        return () => {
            ob.disconnect() 
        } 
    }, [])
    return (
        <div className={className}>
            
            {
                upload && <div className="image-icon">
                    <Icon type="iconphoto" />
                </div>
            }

            
            {
                !lose && <div className="image-icon">
                    <Icon type="iconphoto-fail" />
                </div>
            }

            
            {<img
                onl oad={() => { setUpload(false) }} 
                one rror={() => setLose(false)} 
                alt={alt}
                data-src={src}
                ref={imgRef} />
            }
        </div>
    )
}

export default Image