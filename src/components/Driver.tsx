import { useState } from "react"

interface IDriver {
  fullName: string
  username: string
  passwordHash: string
  email: string
  phoneNumber: string
}

export const Driver = () => {
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [passwordHash, setPasswordHash] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const { addDriver, loading } = useAddDriver();
  const [doneAddMsg, setDoneAddMsg] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDriver({ fullName, username, passwordHash, email, phoneNumber });
    setFullName('');
    setUsername('');
    setPasswordHash('');
    setEmail('');
    setPhoneNumber('');
    setDoneAddMsg(true);
  };

  return (
    <div className='component'>
      <h3>Driver</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="addDriver">Add Driver</label>
        <input name="fullName" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name" />
        <input name="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        <input name="passwordHash" value={passwordHash} onChange={e => setPasswordHash(e.target.value)} placeholder="Password" />
        <input name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input name="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Phone Number" />
        <button type="submit">Add</button>
      </form>

      {loading && <p>Loading...</p>}
      {doneAddMsg && !loading && (
        <p className='submitted-correctly'>
          Driver added successfully
        </p>
      )}
      {/* {error && <p className="error">Error: {error.message}</p>} */}
      {/* {driver && (
        <p>
          Driver {driver.fullName} has been added with username {driver.username} and email {driver.email}
        </p>
      )} */}
    </div>
  );
}

const useAddDriver = () => {
  const [driver, setDriver] = useState<IDriver | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const url = "http://www.busstation1.somee.com/api/Auth/DriverRegister"

  const addDriver = async (driverDetails: IDriver) => {
  setLoading(true);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(driverDetails),
    });

    if (!response.ok) {
      throw new Error('Failed to add driver');
    }

    // Get the Content-Type header from the response
    const contentType = response.headers.get('Content-Type');
    console.log('Content-Type:', contentType);

    const data = await response.json();
    console.log(data);
    setDriver(data);
  } catch (err) {
    setError(err as Error);
  } finally {
    setLoading(false);
  }
};

  return { addDriver, driver, loading, error };
};