import Image from 'next/image'

export default function Fusszeile() {
    return (
        <div className="footer">
            <Image className="logos" src={'/public/logo-host.png'} height={50} width={50}  alt="logo-host"/>
            <Image className="logos" src={'/public/logo-uni-md-hgw.png'} height={50} width={50}  alt="logo-host"/>
        </div>	
    )
  }
  