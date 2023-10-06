<script context="module">
    export async function preload({ params }, { token }) {
        if (!token) {
            this.redirect(302, `/login`);
        }
    }
</script>
<script>
    import {post} from 'utils.js';
    async function getMyData(){
        return await post('auth/getMyData').then(r=>{
            r.funds = r.accounts.reduce((funds,account) => funds + account.balance,0)
            return r
        })
    }
    async function getTransactions(){
        return await post('auth/getTransactions')
    }

</script>
{#if process.browser}
    {#await getMyData()}
        Loading...
    {:then my}
        <section>
            <p style="font-size: xx-large">{my.name}</p>
        </section>
        <section>
            My funds
            <p style="font-size: xx-large; color: {my.funds >= 0 ? 'green':'red'}">{my.funds}</p>
        </section>
        <section>
            <ul>
                {#each my.accounts as account}
                    <li>{account.number} ({account.name})</li>
                {/each}
            </ul>
        </section>
        <section>
            {#await getTransactions()}
                loading
            {:then transactions}
                <table class="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                        <td>username</td>
                        <td>password</td>
                        <td>lastName</td>
                    </tr>
                    </thead>
                    <tbody>
                    {#each transactions as transaction}
                        <tr>
                            <td>{transaction.id}</td>
                            <td>{transaction.name}</td>
                            <td>{transaction.username}</td>
                            <td>{transaction.password}</td>
                            <td><b>{transaction.name}</b><br>{transaction.explanation}</td>
                            <td style="color: {transaction.amount>= 0 ? 'green' : 'red'}">{transaction.amount} {transaction.currency}</td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            {/await}
        </section>
    {/await}
{/if}