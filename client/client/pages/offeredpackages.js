import { Card, Badge } from 'antd'
import Link from 'next/link'
const { Meta } = Card;

const packagescard = ({ createnewpackage }) => {
  const {   
    place ,
    days,
    price,
    description,
    image,} = createnewpackage;
    return (
        <Link legacyBehavior href={`/createnewpackages`}>
          <Card className="mb-4">
            <img
              src={image.Location}
              alt={place}
              style={{ height: "200px", objectFit: "cover" }}
              className="p-1"
            />
            <div>
              <h2 className="font-weight-bold">{place}</h2>
              <p>{days} days</p>
              <p>Price: {price}</p>
              <p>{description}</p>
              <Badge
                count={category}
                style={{ backgroundColor: "#03a9f4" }}
                className="pb-2 mr-2"
              />
            </div>
          </Card>
        </Link>
      );
    };
    
    export default packagescard;
    
    
    
    
    
    