describe('URL', () => {
    // bug #1

    it('should not be usable for creating a worker if revoked directly', (done) => {
        const blob = new Blob([''], { type: 'application/javascript; charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const worker = new Worker(url);

        worker.addEventListener('error', () => done());

        URL.revokeObjectURL(url);
    });
});
