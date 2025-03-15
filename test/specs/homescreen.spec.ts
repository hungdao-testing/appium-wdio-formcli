import { expect} from '@wdio/globals'
import HomePage from '../pageobjects/home.page'


describe('Home screen @home-screen @smoke', () => {
    const home = new HomePage();

    it('should load home screen', async () => {
        expect(await home.isAt()).toBeTruthy();
    })

    it('should go to Checkout screen', async () => {
        await home.openCheckOut();
    })
})

